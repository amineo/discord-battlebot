// Setup main config with our env vars and basic settings.
const package = require("./package.json");

// ENV specific variables
let prefix, roleIDSets, playerThreshold;
if(process.env.NODE_ENV == 'dev'){
    prefix = ["!devbot", "!dd", "!d"];
    roleIDSets = ['501753215151243265'];
    playerThreshold = 0;
}else{
    prefix = ["!battlebot","!bb", "!b"];
    roleIDSets = ['501753215151243265','501961027273883648'];
    playerThreshold = 10;
}


const config = {
    "version": package.version,
    "DISCORD_TOKEN": process.env.DISCORD_TOKEN,
    "STEAM_KEY": process.env.STEAM_KEY,
    "prefix": prefix,
    "ownerID": "127396882908446720",
    "notify": {
        "role": "BB-Notifications",
        "roleIDs": roleIDSets,
        "playerThreshold": playerThreshold,
        "optinKeywords": ["yes", "optin", "optin"],
        "optoutKeywords": ["no", "stop", "optout"]
    },
    "t2ServerList" : [
        {
            "command": "pu",
            "ip": "208.100.45.121:28000"
        },
        {
            "command": "scp",
            "ip": "208.100.45.135:28000"
        }
    ],
    "channels": {
        "t2" : [
            {
                "id": "375399716588093440",
                "notifyID": "501753215151243265",
                "description": "BattleBot Dev Channel"
            },
            {
                "id": "281003732471382017",
                "notifyID": "501961027273883648",
                "description": "Tribes 2 Discord: #chat"
            }
        ],
        "midair": [
            {
                "id": "379305647038005268",
                "description": "BattleBot Dev Channel"
            }
        ]
    },
    "messageDeleteTimer":{
        "command": 300000,
        "bot": 300000
    }
}
module.exports = config;
