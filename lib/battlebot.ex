defmodule BattleBot do
  @moduledoc """
  Documentation for `BattleBot`.
  """

  alias Nostrum.Cache.Me

  @doc """
  Get the url of the avatar image which the bot currently has.
  """
  def get_avatar_url! do
    Me.get()
    |> Nostrum.Struct.User.avatar_url()
  end

  @doc """
  Get the username of the bot without the discriminator.
  """
  def get_username!, do: Me.get().username

  @doc """
  Get the discriminator of the bot.
  """
  def get_discriminator!, do: Me.get().discriminator

  @doc """
  Get the full username with discriminator of the bot.
  """
  def get_full_name! do
    Me.get()
    |> Nostrum.Struct.User.full_name()
  end

  @doc """
  Get the command prefix which the bot uses.
  """
  def get_command_prefix!, do: Application.get_env(:battlebot, :command)

  @doc """
  Get the `String.t()` version of the bot version.
  """
  def get_version! do
    {:ok, vsn} = :application.get_key(:battlebot, :vsn)
    List.to_string(vsn)
  end
end
