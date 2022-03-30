defmodule BattleBot.Interactions do
  @moduledoc """
  Register slash commands and handles interactions
  """

  require Logger
  alias Nostrum.Api
  alias Nostrum.Struct.Interaction

  alias BattleBot.Helpers
  alias BattleBot.Commands.{Info, GameQuery, GuildEvents}

  @doc """
  `reguster_commands`
  Register a modules command by importing `get_command/0` and adding to the list.
  This is what actually enables the slash command module
  """
  @spec register_commands() :: any()
  def register_commands do
    [
      Info.get_command(),
      GameQuery.get_command(),
      GuildEvents.get_command()
    ]
    |> Enum.filter(&(!is_nil(&1)))
    |> register_commands(Application.fetch_env!(:battlebot, :environment))
  end

  defp register_commands(commands, :prod) do
    Api.bulk_overwrite_global_application_commands(commands)
  end

  defp register_commands(commands, _env) do
    case Application.fetch_env(:battlebot, :test_guild_id) do
      {:ok, guild_id} -> Api.bulk_overwrite_guild_application_commands(guild_id, commands)
      _ -> :noop
    end
  end

  @doc """
  `cleanup_interaction`
  Auto-cleans up previous interactions to keep the chat clean :)
  The default timeout is set to 5 minutes and can be found in `config/config.exs`
  under :message_timeout

  TODO: Make this an option that a user can specifiy for each interaction
  """
  defp cleanup_interaction(interaction) do
    {:ok, message_timeout} = Application.fetch_env(:battlebot, :message_timeout)
    Process.sleep(message_timeout)

    try do
      Nostrum.Api.delete_interaction_response(interaction)
    rescue
      err ->
        Logger.error("Couldnt delete interaction: #{interaction}}")
        Logger.error(err)
    end
  end

  @spec handle_interaction(Interaction.t()) :: any()
  def handle_interaction(interaction) do
    Logger.metadata(
      interaction_data: interaction.data,
      guild_id: interaction.guild_id,
      channel_id: interaction.channel_id,
      user_id: interaction.member && interaction.member.user.id
    )

    Logger.info("Interaction received")

    try do
      data = Helpers.parse_interaction_data(interaction.data)
      response = call_interaction(interaction, data)
      Nostrum.Api.create_interaction_response(interaction, response)

      Task.async(fn -> {self(), cleanup_interaction(interaction)} end)
    rescue
      err ->
        Logger.error(err)

        Nostrum.Api.create_interaction_response(interaction, %{
          type: 4,
          data: %{content: "Something went wrong 🔥"}
        })
    end
  end

  defp call_interaction(interaction, {"info", opt}),
    do: Info.handle_interaction(interaction, opt)

  defp call_interaction(interaction, {"query", opt}),
    do: GameQuery.handle_interaction(interaction, opt)

  defp call_interaction(interaction, {"events", opt}),
    do: GuildEvents.handle_interaction(interaction, opt)

  defp call_interaction(_interaction, _data),
    do: raise("Unknown command!")
end
