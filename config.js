// Setup main config with our env vars and basic settings.
const package = require("./package.json");

// ENV specific variables
let prefix;
if(process.env.NODE_ENV == 'dev'){
    prefix = ["!devbot", "!dd", "!d"];
    roleIDSets = ['501753215151243265'];
    playerThreshold = 1;
}else{
    prefix = ["!battlebot","!bb", "!b"];
    roleIDSets = ['501753215151243265','501961027273883648'];
    playerThreshold = 6;
}


const config = {
    "version": package.version,
    "DISCORD_TOKEN": process.env.DISCORD_TOKEN,
    "STEAM_KEY": process.env.STEAM_KEY,
    "prefix": prefix,
    "ownerID": "127396882908446720",
    "t2ServerList" : [
        {
            "command": "pub",
            "ip": "67.222.138.12:28000"
        },
        {
            "command": "arena",
            "ip": "104.238.220.181:28000"
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
