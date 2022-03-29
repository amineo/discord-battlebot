import Config

config :battlebot,
  t2_servers: [
    %{
      type: 3,
      name: "Discord PUB",
      nickname: "PUB",
      value: "35.239.88.241\:28000",
      monitor: true,
      focused: true
    },
    %{
      type: 3,
      name: "20th Classic Server",
      nickname: "20th",
      value: "67.222.138.46\:28000",
      monitor: true
    }
  ]
