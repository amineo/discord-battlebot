import Config

# CRON syntax :: https://crontab.guru/
config :battlebot, BattleBot.Scheduler,
  jobs: [
    {"*/6 * * * *", &BattleBot.Scheduler.T2.TopicMonitor.update_topic/0}
  ]
