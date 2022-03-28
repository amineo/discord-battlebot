defmodule BattleBot.Scheduler do
  @moduledoc """
  The main scheduler module
  """
  use Quantum, otp_app: :battlebot
  alias BattleBot.Scheduler.T2.TopicMonitor
end
