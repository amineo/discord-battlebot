defmodule Battlebot.MixProject do
  use Mix.Project

  def project do
    [
      app: :battlebot,
      version: "0.1.0",
      elixir: "~> 1.13",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {BattleBot.Application, []},
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:t2_server_query, "~> 0.1.2"},
      # Discord API Lib
      # {:nostrum, github: "Kraigie/nostrum"},
      {:nostrum, "~> 0.5.1"},
      # Misc
      {:quantum, "~> 3.4"},
      {:credo, "~> 1.6", only: [:dev, :test], runtime: false}
    ]
  end
end
