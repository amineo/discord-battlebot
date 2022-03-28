defmodule BattleBot.Scheduler.T2.TopicMonitor do
  @moduledoc """
  Topic Monitor
  """
  use Quantum, otp_app: :battlebot

  alias BattleBot.Commands.GameQuery.{T2}
  alias BattleBot.{Helpers}

  def update_topic() do
    servers =
      Application.fetch_env!(:battlebot, :t2_servers)
      |> Enum.map(fn server ->
        if server.monitor == true do
          {ip, port} = Helpers.parse_ip_port(server.value)
          query = T2.handle_query(ip, port)
          return_server_data(server.nickname, query)
        end
      end)
      |> Enum.filter(&(!is_nil(&1)))

    IO.inspect("HI - IM from a schedule!")
    IO.inspect(servers)

  end

  defp return_server_data(name, {:ok, query}) do
    if query.player_count >= 2 do
      "#{name} [#{query.player_count}/#{query.max_player_count}] #{query.mission_type} :: #{query.map_name}"
    else
      "#{name} [#{query.player_count}/#{query.max_player_count}]"
    end
  end

  defp return_server_data(name, {:error, _}) do
    "#{name} [DOWN]"
  end
end
