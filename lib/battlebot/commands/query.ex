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

  alias Nostrum.Struct.{ApplicationCommand, Interaction}

  alias BattleBot.{InteractionBehaviour}
  alias BattleBot.Commands.{GameQuery}

  @behaviour InteractionBehaviour

  @doc """
  `get_command`
  For every game query modules there should exist a `get_command/0`
  that returns a propperly formatted discord application(slash) command map.

  The command map should be listed in the options list below.
  example:
    %{
      ...
      options: [
        GameQuery.T2.get_command()
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
        GameQuery.T2.get_command()
      ]
    }
  end


  @doc """
  `handle_interaction`
  Accompanying the a module's `get_command` there should be
  a `handle_interaction/2` defined for each game. This should keep
  each games functions and logic encapsulated.

  TODO: Make a specific interaction for T2, right how its handled as a catch-all
  """
  @impl InteractionBehaviour
  @spec handle_interaction(Interaction.t(), InteractionBehaviour.interaction_options()) :: map()
  def handle_interaction(interaction, options) do
    GameQuery.T2.handle_interaction(interaction, options)
  end
end
