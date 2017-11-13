// Setup main config with our env vars and basic settings.
const package = require("./package.json");


let prefix;

if(process.env.NODE_ENV == 'dev'){
    prefix = ["!devbot", "!dev", "!d"];
}else{
    prefix = ["!battlebot"];
}

const config = {
    "version": package.version,
    "DISCORD_TOKEN": process.env.DISCORD_TOKEN,
    "STEAM_KEY": process.env.STEAM_KEY,
    "prefix": prefix,
    "ownerID": "127396882908446720",
    "t2ServerList" : [
        {
            "command": "lak",
            "ip": "67.222.138.13:28000"
        },
        {
            "command": "scp",
            "ip": "208.100.45.135:28000"
        },
        {
            "command": "taco",            
            "ip": "104.156.254.70:28000"
        }
    ],
    "channels": {
        "t2" : [
            {
                "id": "375399716588093440",
                "description": "BattleBot Dev Channel"
            },
            {
                "id": "281003732471382017",
                "description": "Tribes 2 Discord"
            }
        ],
        "midair": [
            {
                "id": "379305647038005268",
                "description": "BattleBot Dev Channel"
            },
            {
                "id": "354073039257862145",
                "description": "Tribes 2 Discord"
            }
        ]
    },
    "messageDeleteTimer":{
        "command": 300000,
        "bot": 300000
    }
}
module.exports = config;