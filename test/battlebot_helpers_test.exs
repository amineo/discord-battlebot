defmodule BattleBotHelpersTest do
  use ExUnit.Case, async: true
  #doctest BattleBot

  alias BattleBot.{Helpers}

  test "Check for t2_server config" do
    assert {:ok, t2_servers} = Application.fetch_env(:battlebot, :t2_servers)
  end



  test "Helper :: Get friendly Tribes 2 server name from config" do
    {:ok, t2_servers} = Application.fetch_env(:battlebot, :t2_servers)

    test_ip =
      t2_servers
      |> Enum.at(0)
      |> Map.get(:value)

    friendly_name = Helpers.find_t2_server_name_from_ip_in_config(test_ip)

    refute friendly_name == "Check the ip:port combo and try again"
  end



  test "Helper :: Find selected command option" do
    options = [
      %{
        focused: nil,
        name: "t2",
        options: [
          %{
            focused: nil,
            name: "server",
            options: nil,
            type: 3,
            value: "35.239.88.241:28000"
          }
        ],
        value: nil
      }
    ]

    successful_lookup_from_options = {:ok, %{
      focused: nil,
      name: "server",
      options: nil,
      type: 3,
      value: "35.239.88.241:28000"
    }}

    empty_lookup_from_options = {nil, %{name: "nonexistent"}}

    assert successful_lookup_from_options == Helpers.get_option(options, "server")
    assert empty_lookup_from_options == Helpers.get_option(options, "nonexistent")
  end


  test "Helper :: Parse IP and port from string and default port fallback" do

    ip_with_custom_port  = "127.0.0.1:54321"
    ip_with_default_fallback_port = "127.0.0.1"

    assert {"127.0.0.1", 54_321} == Helpers.parse_ip_port(ip_with_custom_port)
    assert {"127.0.0.1", 28_000} == Helpers.parse_ip_port(ip_with_default_fallback_port)
  end

end
