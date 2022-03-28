defmodule BattleBot.Commands.GameQuery do
  @moduledoc """
  Handles `/query` slash command

  [Command Outline]
  /query
    * t2
        -- server
            > server a
            > server b
            > server c
        -- ip
        -- format
            > image
            > raw
  """
  require Logger

  import Nostrum.Struct.Embed
  alias Nostrum.Struct.{ApplicationCommand, Interaction}

  alias BattleBot.{Helpers, InteractionBehaviour}
  alias BattleBot.Commands.GameQuery.{T2}

  @behaviour InteractionBehaviour

  @doc """
  `get_command`
  For every game query modules there should exist a `get_sub_command_map/0`
  that returns a propperly formatted discord application(slash) command map.

  The command map should be listed in the options list below.
  example:
    %{
      ...
      options: [
        T2.get_sub_command_map()
      ]
    }
  """
  @impl BattleBot.InteractionBehaviour
  @spec get_command() :: ApplicationCommand.application_command_map()
  def get_command do
    %{
      name: "query",
      description: "Query a game server",
      options: [
        T2.get_sub_command_map()
      ]
    }
  end


  @doc """
  `handle_interaction`
  Accompanying the a module's `get_sub_command_map` there should be
  a `handle_interaction/2` defined for each game. This should keep
  each games functions and logic encapsulated.

  TODO: Make a specific interaction for T2, right how its handled as a catch-all
  """
  @impl InteractionBehaviour
  @spec handle_interaction(Interaction.t(), InteractionBehaviour.interaction_options()) :: map()
  def handle_interaction(interaction, options) do
    T2.handle_interaction(interaction, options)
  end
end
