defmodule BattleBot.Commands.GameQuery.T2 do
  @moduledoc """
  Handles the `/query t2` slash command
  """
  require Logger

  import BattleBot.Commands.GameQuery.T2.Embed.ServerDetailed
  import BattleBot.Commands.GameQuery.T2.Embed.ServerList

  alias Nostrum.Struct.{ApplicationCommand, Interaction}
  alias BattleBot.{Helpers, InteractionBehaviour}

  @behaviour InteractionBehaviour

  @doc """
  `get_command`
  Generate the `/query t2 ...` application commands/options
  The list of servers gets retrieved from `config/t2_servers.exs`

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
  @impl BattleBot.InteractionBehaviour
  @spec get_command() :: ApplicationCommand.application_command_map()
  def get_command() do
    {:ok, t2_servers} = Application.fetch_env(:battlebot, :t2_servers)

    %{
      ## SUB-COMMAND
      type: 1,
      name: "t2",
      description: "Query Tribes 2 server list",
      options: [
        %{
          ## STRING
          type: 3,
          name: "server",
          description: "Query a Tribes 2 Server",
          choices: t2_servers,
          focused: true
        },
        %{
          ## STRING
          type: 3,
          name: "format",
          description: "Query output format",
          choices: [
            %{
              type: 3,
              name: "Image",
              value: "image"
            },
            %{
              type: 3,
              name: "Raw",
              value: "raw"
            }
          ]
        },
        %{
          ## STRING
          type: 3,
          name: "ip",
          description: "Manual query by ip:port -- No port defaults to 28000"
        }
      ]
    }
  end


  @doc """
  `handle_query`
  Default query handler uses the `T2ServerQuery` package.
    - repo: https://github.com/amineo/t2_server_query_elixir
    - docs: https://hexdocs.pm/t2_server_query/

  This function wraps that module and handles the responses accordingly.
  """
  def handle_query(ip, port) do
    query_timeout = 550
    case T2ServerQuery.query(ip, port, query_timeout) do
      {:ok, result} -> {:ok, result}
      {:error, reason} -> {:error, reason}
    end
  end


  # `query_format`
  # Return the selected or a fallback default query output format.
  #
  # The default query output format is specified in `config/confix.exs`
  # `:battlebot, :default_query_format: "image"`
  #
  # Shape of data with format option:
  # ```
  #   {:ok,
  #     %Nostrum.Struct.ApplicationCommandInteractionDataOption{
  #       focused: nil,
  #       name: "format",
  #       options: nil,
  #       type: 3,
  #       value: "image"
  #   }}
  # ```
  #
  # Shape of data with no format option:
  # ```
  #   {nil, %{name: "format"}}
  # ```
  defp query_format({:ok, opt} = _format) do
    opt.value
  end

  defp query_format(_) do
    Application.fetch_env!(:battlebot, :default_query_format)
  end



  # `query_target`
  # Determine if we're targeting a server listed from `t2_servers.exs`
  # or if its a manual IP entry
  defp query_target(%{:name => "server"} = option, format) do
    {ip, port} = Helpers.parse_ip_port(option.value)

    handle_query(ip, port)
    |> t2_server_detail_embed(format)
  end

  defp query_target(%{:name => "ip"} = option, format) do
    default_t2_port = 28_000
    {ip, port} = Helpers.parse_ip_port(option.value, default_t2_port)

    handle_query(ip, port)
    |> t2_server_detail_embed(format)
  end



  # `query_server_list`
  # If `list` gets passed in as an empty array, a server list query will be performed.
  # `query_server_list(list) when list == []`
  #
  # If `list` has items, return back the already queried servers
  @spec query_server_list(list()) :: list()
  defp query_server_list(list) when list == [] do
    Application.fetch_env!(:battlebot, :t2_servers)
    |> Enum.map(fn server ->
      {ip, port} = Helpers.parse_ip_port(server.value)
      handle_query(ip, port)
    end)
    |> t2_server_list_embed()
    |> List.wrap()
  end

  defp query_server_list(list) do
    # Return the already queried servers
    list
  end



  @doc """
  `handle_interaction`
  Main handler for the `t2` command option.
  """
  @impl InteractionBehaviour
  @spec handle_interaction(Interaction.t(), InteractionBehaviour.interaction_options()) :: map()
  def handle_interaction(_interaction, [%{:name => "t2"}] = options) do
    qry_format =
      Helpers.get_option(options, "format")
      |> query_format()

    # TODO: Enhancement -> fill dynamically based off an atom in the map
    interaction_options = [
      Helpers.get_option(options, "server"),
      Helpers.get_option(options, "ip")
    ]

    embed =
      Enum.reduce(interaction_options, [], fn option, acc ->
        # IO.inspect option
        {action, o} = option
        if action, do: [query_target(o, qry_format) | acc], else: acc
      end)
      |> query_server_list()


    # TODO: Clean this up -- related to image message
    # case qry_format do
    #   "image" ->
    #     %{
    #       type: 4,
    #       data: %{files: embed}
    #     }

    #   "raw" ->
    #     %{
    #       type: 4,
    #       data: %{embeds: embed}
    #     }
    # end


    %{
      type: 4,
      data: %{embeds: embed}
    }

  end
end
