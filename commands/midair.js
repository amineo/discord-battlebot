const request = require('request');


exports.run = async (client, message, args) => {

    await request(`https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${client.config.STEAM_KEY}&filter=appid%5C439370`, function (error, response, body) {
        displaySummary(body);
    });

    function displaySummary(body){

        let serverList = JSON.parse(body);
        let lookupDate = new Date();
        let discordTable = [];
        let discordMsg = {
            "embed": {
              "title": "Populated Midair Servers",
              "color": 8615418,
              "timestamp": lookupDate.toISOString()
            }
        };


        serverList.response.servers.forEach(function (server) {
            if(server.players !== 0){
                let objServer = {
                    "name": `${server.name}`,
                    "value": `**[JOIN](steam://connect/${server.addr})**    (${server.players} / ${server.max_players}) ${server.map}`,
                    "inline": false
                }
                discordTable.push(objServer);
            }
        });

        discordMsg["embed"]["fields"] = discordTable;

        message.channel.send(discordMsg).then(function (botmessage) {
            let customTimeout;

            // Abort out if we want this message to be posted indefinitely
            if (args.indexOf('post') > -1 || args.indexOf('sticky') > -1) {
                return;
            }

            if (Number.isInteger(parseInt(args[0])) && parseInt(args[0]) <= 120) {
                customTimeout = (parseInt(args[0]) * 60000);
            };

            // cleanup messages after 5 minutes
            message.delete({timeout: customTimeout ? customTimeout : client.config.messageDeleteTimer.command});
            botmessage.delete({timeout: customTimeout ? customTimeout : client.config.messageDeleteTimer.bot});
        });

    }

}



exports.conf = {
    enabled: false,
    aliases: ['ma']
};




exports.help = {
    name: "midair",
    description: "Display a summary of only populated Midair servers",
    usage: "midair"
};