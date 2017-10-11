const request = require('request');
exports.run = (client, message, args, config) => {

    request(`https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${process.env.STEAM_KEY}&filter=appid%5C439370`, function (error, response, body) {

        let serverList = JSON.parse(body);
        let lookupDate = new Date();
        

        let discordMsg = {
            "embed": {
              "title": "Populated Midair Servers",
              "color": 8615418,
              "timestamp": lookupDate.toISOString()
            }
          };


        let discordTable = [];

        serverList.response.servers.forEach(function (server) {
            if(server.players !== 0){
                let objServer = {
                    "name": `${server.name}`,
                    "value": `(${server.players} / ${server.max_players}) ${server.map}`,
                    "inline": false
                }
                discordTable.push(objServer);
            }
          });

          discordMsg["embed"]["fields"] = discordTable;

            message.channel.send(discordMsg).then(function(botmessage){
                // cleanup messages after 5 minutes
                message.delete(config.messageDeleteTimer.command);
                botmessage.delete(config.messageDeleteTimer.bot);
            });

    });

}