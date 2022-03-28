defmodule BattleBot.Helpers do
  @moduledoc """
  Helpers for handling the interaction and options
  """
  require Logger

  alias Nostrum.Struct.ApplicationCommandInteractionData
  alias BattleBot.InteractionBehaviour

  @spec parse_interaction_data(ApplicationCommandInteractionData.t()) ::
          InteractionBehaviour.interaction_input()
  def parse_interaction_data(interaction_data) when is_nil(interaction_data.custom_id) do
    options =
      (interaction_data.options || [])
      |> Enum.map(fn opt ->
        %{
          name: opt.name,
          value: opt.value,
          options: opt.options || nil,
          focused: Map.get(opt, :focused, false)
        }
      end)

    {interaction_data.name, options}
  end

  def parse_interaction_data(interaction_data) do
    [name, options_string] = String.split(interaction_data.custom_id, "|")

    options =
      String.split(options_string, ":")
      |> Enum.chunk_every(2)
      |> Enum.reduce([], fn [name, value], acc ->
        acc ++ [%{name: name, value: value, focused: false}]
      end)

    {name, options}
  end

  # [%{focused: nil, name: "server", options: nil, value: "35.239.88.241:28000"}]
  @spec get_option(InteractionBehaviour.interaction_options(), String.t()) ::
          {String.t(), boolean()}
  def get_option(options, name) when is_nil([options.options]) do
    find_option(options, name)
  end

  # Has nested (2nd lvl) options
  def get_option(options, name) do
    nested_options =
      options
      |> Enum.at(0)
      |> Map.get(:options)

    find_option(nested_options, name)
  end

  @spec find_option(InteractionBehaviour.interaction_options(), String.t()) ::
          {String.t(), boolean()}
  defp find_option(options, name) do
    case Enum.find(options, fn opt -> opt.name == name end) do
      nil ->
        {nil, %{name: name}}

      option ->
        {:ok, option}
    end
  end

  @spec cleanup_input(String.t()) :: String.t()
  def cleanup_input(input) do
    input
    |> String.trim()
    |> String.downcase()
  end

  @spec parse_ip_port(String.t()) :: {String.t(), Integer.t()}
  def parse_ip_port(server, default_port \\ 28_000) do
    [ip | tail] = String.split(server, ":")

    if Enum.empty?(tail) do
      {ip, default_port}
    else
      port =
        tail
        |> to_string()
        |> String.to_integer()

      {ip, port}
    end
  end

  @spec find_t2_server_name_from_ip_in_config(String.t()) :: String.t()
  def find_t2_server_name_from_ip_in_config(ip) do
    {:ok, t2_servers} = Application.fetch_env(:battlebot, :t2_servers)

    case Enum.find(t2_servers, fn option -> option.value == ip end) do
      nil ->
        "Check the ip:port combo and try again"

      option ->
        option.name
    end
  end
end
