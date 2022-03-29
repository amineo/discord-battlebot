import Config

config :battlebot,
  command: "!dd"

config :logger,
  level: :debug


import_config "t2_servers.dev.exs"
