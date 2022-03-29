import Config

config :battlebot,
  command: "!bb"

config :logger,
  level: :info


import_config "t2_servers.prod.exs"
