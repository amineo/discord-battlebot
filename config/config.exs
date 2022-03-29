import Config

config :battlebot,
  environment: Mix.env(),
  steam_key: System.get_env("STEAM_KEY"),
  twitch_client_id: System.get_env("TWITCH_CLIENT_ID"),
  twitch_client_secret: System.get_env("TWITCH_CLIENT_SECRET"),
  # This makes the slash commands update instantly,
  # since discord takes about one hour to sync the commands globally.
  # Loads from the server you are testing on
  test_guild_id: System.get_env("TEST_GUILD_ID"),

  # Default message/interaction timeout is set to 5 minutes
  # before it becomes automatically cleaned up
  message_timeout: 60 * 5_000,
  # Default query return format
  default_query_format: "image"

config :nostrum,
  token: System.get_env("DISCORD_BOT_TOKEN"),
  num_shards: :auto

config :logger, :console,
  format: "\n$time [$level] $levelpad $message $metadata\n",
  metadata: [:interaction_data, :guild_id, :channel_id, :user_id]

import_config "#{Mix.env()}.exs"
import_config "t2_scheduler.exs"
