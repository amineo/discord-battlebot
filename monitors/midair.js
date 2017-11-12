const request = require('request');
const moment = require('moment-timezone');

exports.run = async (client) => {
    let enabled = exports.conf.enabled;
    let time = 0;



    let t = setInterval(async function () {
        if (enabled) {

            await request(`https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${client.config.STEAM_KEY}&filter=appid%5C439370`, function (error, response, body) {
                setTopic(JSON.parse(body));
            });


            function setTopic(body){
                let playerCount = 0;
                body.response.servers.forEach(function (server) {
                    playerCount = playerCount + server.players;
                });

                let lookupDate = moment().tz('America/New_York').format('MM/DD/YYYY, h:mm a');


                client.config.channels.midair.forEach(function (channel) {
                    if (client.channels.get(channel.id)) {
                        client.channels.get(channel.id).setTopic(`Active Players: ${playerCount} - [${lookupDate}]`)
                            .then(liveTopic => console.log(`Channel (${channel.id})'s new topic is ${liveTopic.topic}`))
                            .catch(console.error);
                    }
                    client.wait(500);
                })





            }

        }
    }, exports.conf.interval);
}


exports.conf = {
    name: "midair-monitor",
    description: "Monitor how many people are playing Midair",
    enabled: true,
    interval: 60001
};