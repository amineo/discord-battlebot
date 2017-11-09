const QueryList = require('../modules/QueryList.js');
const moment = require('moment-timezone');

exports.run = async (client) => {
    let enabled = exports.conf.enabled;
    let time = 0;


    let t = setInterval(async function () {
        if (enabled) {
            let queryServerList = new QueryList(client.config.t2ServerList);
            let serverInfo = await queryServerList.queryList();

            time++;
            console.log("Query: " + time);


            let channelTopic = [];
            let lookupDate = moment().tz('America/New_York').format('MM/DD/YYYY, h:mm a');
            serverInfo.forEach(function (server) {
                let topic = ` ${server.command.toUpperCase()} (${server.numplayers} / ${server.maxplayers})`;
                channelTopic.push(topic);
            });

            client.config.channels.forEach(function (channel) {
                client.channels.get(channel.id).setTopic(`${channelTopic.toString()} - [${lookupDate}]`)
                    .then(liveTopic => console.log(`Channel's new topic is ${liveTopic.topic}`))
                    .catch(console.error);

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