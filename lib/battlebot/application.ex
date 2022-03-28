defmodule BattleBot.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      BattleBot.Consumer,
      BattleBot.Scheduler
    ]

    # Using `httpc` so lets make sure we're starting inets and ssl
    Application.ensure_all_started(:inets)
    Application.ensure_all_started(:ssl)

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: BattleBot.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
