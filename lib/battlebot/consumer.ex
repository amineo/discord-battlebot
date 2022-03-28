defmodule BattleBot.Consumer do
  @moduledoc """
  The main Discord consumer. This handles all of the events
  for the bot and then continues with the rest of the logic depending
  on the event and result.

  This does not directly send messages, it is only a parser.
  """

  require Logger
  use Nostrum.Consumer

  alias BattleBot.Interactions

  @command BattleBot.get_command_prefix!()

  def start_link do
    Consumer.start_link(__MODULE__)
  end

  @doc """
  Handles the `:MESSAGE_CREATE` event. If it is
  seen as a command crated from an user, it will
  parse it to the command module.
  """

  # def handle_event({:MESSAGE_CREATE, message, _ws_state}) do
  #   if !message.author.bot and is_bb_command?(message),
  #     do: BattleBot.Command.handle_message(message)
  # end

  @doc """
  Listen to ready event and update the status.
  https://hexdocs.pm/nostrum/Nostrum.Api.html#update_status/4
  """
  def handle_event({:READY, _, _}) do
    Interactions.register_commands()

    version = to_string(Application.spec(:battlebot, :vsn))
    Nostrum.Api.update_status(:online, "/query t2", 0)

    Logger.info("BattleBot #{version} started...")
  end

  def handle_event({:INTERACTION_CREATE, interaction, _ws_state}) do
    Interactions.handle_interaction(interaction)
  end

  @doc """
  This only exists so that when an uncaptured event is
  created the bot won't create an error!
  """
  def handle_event(_event) do
    :noop
  end

  @doc """
  `is_bb_command`
  Check whether a message is an BattleBot command.

  ** Will probably be deprecated since we're only using slash commands
  """
  def is_bb_command?(message) do
    message.content
    |> String.downcase()
    |> String.split(" ")
    |> Enum.at(0)
    |> String.equivalent?(@command)
  end
end
