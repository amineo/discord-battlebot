defmodule BattleBot.Commands.GameQuery.T2.Embed.ServerDetailed do
  @moduledoc """
  Detailed server query embed
  """
  alias Nostrum.Struct.Embed
  import Nostrum.Struct.Embed
  alias BattleBot.{Helpers}


  # Using embed
  def t2_server_detail_embed({:ok, result}, "image" = _format) do
    cache_bust = :os.system_time(:millisecond)
    server_name = URI.encode(result.server_name)

    # TODO: Determine if we should return a message or an embed here.
    #
    #       There could be a warmup issue when hitting the image endpoint
    #       which would result in a "command error" since the timeout for
    #       application commands is (a very generious /s) 3 seconds!
    #       It seems like using an embed would get around this since it returns
    #       the origin url and not cached from a discord url

    image_url = "https://t2-server-xbar.herokuapp.com/#{cache_bust}/serverName/#{server_name}/padding/0/image.png"

    %Embed{}
      |> put_author(result.server_name, nil, nil)
      |> put_image(image_url)
  end

  # Using message
  # def t2_server_detail_embed({:ok, result}, "image" = format) do
  #   cache_bust = :os.system_time(:millisecond)
  #   server_name = :http_uri.encode(result.server_name)

  #   # TODO: Determine if we should return a message or an embed here.
  #   #
  #   #       There could be a warmup issue when hitting the image endpoint
  #   #       which would result in a "command error" since the timeout for
  #   #       application commands is (a very generious /s) 3 seconds!
  #   #       It seems like using an embed would get around this since it returns
  #   #       the origin url and not cached from a discord url


  #   # Note: using of single-quotes for binary
  #   image_url = 'https://t2-server-xbar.herokuapp.com/#{cache_bust}/serverName/#{server_name}/padding/0/image.png'

  #   {:ok, resp} = :httpc.request(:get, {image_url, []}, [], [body_format: :binary])
  #   {{_, 200, 'OK'}, _headers, image_body} = resp

  #   %{
  #     body: image_body,
  #     name: "#{cache_bust}.png"
  #   }
  # end



  def t2_server_detail_embed({:ok, result}, "raw" = _format) do
    embed_team_fields =
      result.teams
      |> Enum.map(fn team ->
        %Embed.Field{
          name: team.name,
          value: "```fix\n#{team.score}```",
          inline: true
        }
      end)

    embed_player_fields =
      result.players
      |> Enum.map(fn player ->
        if Map.has_key?(player, :player) do
          %Embed.Field{
            name: player.player,
            value: "`#{player.score} - #{player.team}`",
            inline: true
          }
        else
          %Embed.Field{
            name: "\u200B",
            value: ":green_circle: Join up and start the pub!",
            inline: false
          }
        end
      end)

    # IO.inspect embed_player_fields

    %Embed{fields: []}
      |> put_author(result.server_name, nil, nil)
      |> put_title(result.map_name)
      # |> put_description("#{result.mission_type} - #{result.game_type}")
      |> put_timestamp(DateTime.to_iso8601(DateTime.now!("Etc/UTC")))
      |> put_color(9_551_472)
      |> put_field("#{result.mission_type} - #{result.game_type}", "\u200B", false)
      |> (&%{&1 | fields: Enum.concat(&1.fields, embed_team_fields)}).()
      |> put_field(
        "\u200B",
        "**Players #{result.player_count}/#{result.max_player_count} (#{result.bot_count})**",
        false
      )
      |> (&%{&1 | fields: Enum.concat(&1.fields, embed_player_fields)}).()
  end

  def t2_server_detail_embed({:error, reason}, _format) do
    friendly_name = Helpers.find_t2_server_name_from_ip_in_config(reason.server_name)

    %Embed{fields: []}
      |> put_author(friendly_name, nil, nil)
      |> put_title(reason.server_name)
      |> put_description(":red_circle: **OFFLINE** - _#{reason.server_description}_")
      |> put_timestamp(DateTime.to_iso8601(DateTime.now!("Etc/UTC")))
      |> put_color(16_723_281)
  end
end
