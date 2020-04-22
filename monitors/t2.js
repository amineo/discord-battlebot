const QueryList = require('../modules/QueryList.js');
const moment = require('moment-timezone');

exports.run = async (client) => {
    let enabled = exports.conf.enabled;
    let time = 0;

    let t = setInterval(async function () {
        if (enabled) {
            // lock monitor to discord pub only for now
            let queryServerList = new QueryList(client.config.t2ServerList);
            let serverInfo = await queryServerList.queryList();

            time++;
            console.log("Query: " + time);
    
            let channelTopic = [];
            let lookupDate = moment().tz('America/New_York').format('h:mm a');
            serverInfo.forEach(function (server) {
                if (server.status === 'online') {
                    let topic;
                    if(server.numplayers >= 2) {
                        topic = ` ${server.command.toUpperCase()} [${server.numplayers} / ${server.maxplayers}] ${server.rules['mission']} :: ${server.map}`;
                    }else{
                        topic = ` ${server.command.toUpperCase()} [${server.numplayers} / ${server.maxplayers}]`;
                    }
                    channelTopic.push(topic);
                } else {
                    let topic = ` ${server.command.toUpperCase()} [DOWN]`;
                    channelTopic.push(topic);
                    console.log('Having issues reaching server:' + server.command);
                    console.log('Status:' + server.status);
                    return;
                }
                
            });

            client.config.channels.t2.forEach(function (channel) {
                if (client.channels.get(channel.id)){
                    client.channels.get(channel.id).setTopic(`${channelTopic.toString()} - ${lookupDate} EST`)
                        .then(liveTopic => console.log(`Channel (${channel.id})'s new topic is ${liveTopic.topic}`))
                        .catch(console.error);
                }
                client.wait(500);
            })

        }
    }, exports.conf.interval);

}

exports.conf = {
    name: "t2-monitor",
    description: "Tribes 2 server traffic monitor. Traffic reports set as channel topics",
    enabled: true,
    interval: 30000
};
