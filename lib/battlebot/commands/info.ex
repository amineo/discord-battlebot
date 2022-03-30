defmodule BattleBot.Commands.Info do
  @moduledoc """
  Handles /info
  Returns some info about the bot
  """
  import Nostrum.Struct.Embed
  alias Nostrum.Struct.Embed
  alias Nostrum.Struct.{ApplicationCommand, Interaction}

  alias BattleBot.InteractionBehaviour

  @behaviour InteractionBehaviour

  @impl BattleBot.InteractionBehaviour
  @spec get_command() :: ApplicationCommand.application_command_map()
  def get_command,
    do: %{
      name: "info",
      description: "Some info about BattleBot"
    }

  @impl InteractionBehaviour
  @spec handle_interaction(Interaction.t(), InteractionBehaviour.interaction_options()) :: map()
  def handle_interaction(_interaction, _options) do
    embed =
      %Embed{}
      |> put_author("BattleBot v#{Application.spec(:battlebot, :vsn) |> to_string()}", nil, nil)
      |> put_field("Uptime", uptime(), true)
      |> put_field("Processes", "#{length(:erlang.processes())}", true)
      |> put_field("Memory", "#{div(:erlang.memory(:total), 1_000_000)} MB", true)
      |> put_field("Elixir", System.version, true)
      |> put_field("Source", "[GitHub](https://github.com/amineo/battlebot/)", true)

    %{
      type: 4,
      data: %{embeds: [embed]}
    }
  end



  defp uptime do
    {time, _} = :erlang.statistics(:wall_clock)

    sec = div(time, 1000)
    {min, sec} = {div(sec, 60), rem(sec, 60)}
    {hours, min} = {div(min, 60), rem(min, 60)}
    {days, hours} = {div(hours, 24), rem(hours, 24)}

    Stream.zip([sec, min, hours, days], ["s", "m", "h", "d"])
    |> Enum.reduce("", fn
      {0, _glyph}, acc -> acc
      {t, glyph}, acc -> " #{t}" <> glyph <> acc
    end)
  end
end
