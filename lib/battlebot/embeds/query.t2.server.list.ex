defmodule BattleBot.Commands.GameQuery.T2.Embed.ServerList do
  @moduledoc """
  Server list embed
  """

  require Logger

  alias Nostrum.Struct.Embed
  import Nostrum.Struct.Embed
  alias BattleBot.{Helpers}


  @spec t2_server_list_embed(list()) :: Embed.t()
  def t2_server_list_embed(servers) do
    embed_server_fields =
      servers
      |> Enum.map(fn server ->
        return_server_field(server)
      end)

    %Embed{fields: []}
    |> put_title("Tribes 2 Servers")
    |> put_timestamp(DateTime.to_iso8601(DateTime.now!("Etc/UTC")))
    |> put_color(1_946_747)
    |> (&%{&1 | fields: Enum.concat(&1.fields, embed_server_fields)}).()
  end


  defp return_server_field({:ok, server}) do
    %Embed.Field{
      name: server.server_name,
      value:
        "(#{server.player_count} / #{server.max_player_count}) - #{server.map_name} - *#{server.mission_type}*",
      inline: false
    }
  end

  defp return_server_field({:error, reason}) do
    friendly_name = Helpers.find_t2_server_name_from_ip_in_config(reason.server_name)

    %Embed.Field{
      name: "#{friendly_name} - (#{reason.server_name})",
      value: ":red_circle: **OFFLINE** - _#{reason.server_description}_",
      inline: false
    }
  end
end
