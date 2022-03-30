defmodule BattleBot.Commands.GuildEvents do
  @moduledoc """
  Handles /events
  List scheduled events for a Discord server
  """

  alias Nostrum.Struct.{ApplicationCommand, Interaction}
  alias BattleBot.InteractionBehaviour

  @behaviour InteractionBehaviour


  def get_guild_event_urls({:ok, events} = _guild_events) do
    Enum.reduce(events, [], fn event, acc ->
      event_url = "https://discord.com/events/#{event.guild_id}/#{event.id}"
      if event, do: [event_url | acc], else: acc
    end)
  end

  def get_guild_event_urls({:error, reason} = _reason) do
    ["⚠️ Slowdown there cowboy or we'll be rate-limited.\n **Please try again in about #{reason.response.retry_after + 1} seconds.**"]
  end


  @impl BattleBot.InteractionBehaviour
  @spec get_command() :: ApplicationCommand.application_command_map()
  def get_command,
    do: %{
      name: "events",
      description: "List scheduled events"
    }


  @impl InteractionBehaviour
  @spec handle_interaction(Interaction.t(), InteractionBehaviour.interaction_options()) :: map()
  def handle_interaction(interaction, _options) do
    guild_events =
      interaction.guild_id
      |> Nostrum.Api.get_guild_scheduled_events()
      |> get_guild_event_urls()
      |> Enum.join("\n")

    %{
      type: 4,
      data: %{
        content: guild_events
      }
    }
  end

end
