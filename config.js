// Setup main config with our env vars and basic settings.
const package = require("./package.json");


let prefix;

if(process.env.NODE_ENV == 'dev'){
    prefix = "!bb"; // ["!bb", "!dev"];
}else{
    prefix = "!battlebot"; //["!battlebot"];
}

const config = {
    "version": package.version,
    "DISCORD_TOKEN": process.env.DISCORD_TOKEN,
    "STEAM_KEY": process.env.STEAM_KEY,
    "prefix": prefix,
    "ownerID": "127396882908446720",
    "t2ServerList" : [
      {"ip": "67.222.138.13:28000"},
      {"ip": "67.222.138.12:28000"},
      {"ip": "208.100.45.135:28000"}
    ],
    "messageDeleteTimer":{
      "command":300000,
      "bot":300000
    }
}
module.exports = config;