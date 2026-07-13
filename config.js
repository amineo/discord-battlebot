// Setup main config with our env vars and basic settings.
const package = require("./package.json");

// ENV specific variables
let prefix;
if (process.env.NODE_ENV == "dev") {
  prefix = ["!devbot", "!dd", "!d"];
  roleIDSets = ["501753215151243265"];
} else {
  prefix = ["!battlebot", "!bb", "!b", "!BB", "!B"];
  roleIDSets = ["501753215151243265", "501961027273883648"];
}

const config = {
  version: package.version,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  STEAM_KEY: process.env.STEAM_KEY,
  prefix: prefix,
  ownerID: "127396882908446720",
  t2ServerList: [
    {
      command: "cut",
      ip: "216.128.148.51:28003",
      monitor: true,
    },
    {
      command: "lgc",
      ip: "216.128.148.51:28000",
      monitor: true,
    },
    {
      command: "dad",
      ip: "66.42.121.64:28005",
      monitor: true,
    }    
  ],
  channels: {
    t2: [
      {
        id: "375399716588093440",
        notifyID: "501753215151243265",
        description: "BattleBot Dev Channel",
      },
      {
        id: "281003732471382017",
        notifyID: "501961027273883648",
        description: "Tribes 2 Discord: #chat",
      },      
      {
        id: "1196191529140764763",
        notifyID: "501753215151243265",
        description: "24/7 Tribes: #chatroom",
      },
      {
        id: "1301952874103705712",
        notifyID: "501753215151243265",
        description: "The CUT: #the-cut",
      },      
    ],
    midair: [
      {
        id: "379305647038005268",
        description: "BattleBot Dev Channel",
      },
    ],
  },
  messageDeleteTimer: {
    command: 300000,
    bot: 300000,
  },
};
module.exports = config;
