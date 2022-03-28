defmodule Mix.Tasks.Battlebot.Start do
  use Mix.Task

  @moduledoc """
  Starts the Discord bot with `--no-halt` automatically added!
  """

  @doc false
  def run(args) do
    Mix.Tasks.Run.run(["--no-halt"] ++ args)
  end
end
