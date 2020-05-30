const QueryList = require('../modules/QueryList.js');
const moment = require('moment-timezone');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

exports.run = (client) => {
    const topicMonitorServerList = client.config.t2ServerList.filter(server => server.monitor === true);
    const queryServerList = new QueryList(topicMonitorServerList);
    
    let queryIteration = 0;

    setInterval(async function () {
        // Add only if topic monitor is enabled for the server
        let serverInfo = await queryServerList.queryList();
        let channelTopic = [];

            queryIteration++;
        //     console.log("Query: " + queryIteration);
        // let lookupDate = moment().tz('America/New_York').format('h:mm a');
        // client.channels.get('375399716588093440').setTopic("HI"+queryIteration)

        if ( exports.conf.enabled) {
    
            serverInfo.forEach( function (server, i) {
                if (server.status === 'online') {
                    let topic;
                    if(server.numplayers >= 2) {
                        topic = `${server.command.toUpperCase()} [${server.numplayers} / ${server.maxplayers}] ${server.rules['mission']} :: ${server.map}`;
                    }else{
                        topic = `${server.command.toUpperCase()} [${server.numplayers} / ${server.maxplayers}]`;
                    }
                    channelTopic.push(topic);
                } else {
                    let topic = `${server.command.toUpperCase()} [DOWN]`;
                    channelTopic.push(topic);
                    console.log('Having issues reaching server:' + server.command);
                    console.log('Status:' + server.status);
                    return;
                }
            });

           console.log(channelTopic);


            

             // console.log(client.channels.get('375399716588093440'));
   
            // client.channels.get('375399716588093440').setTopic(`${channelTopic.toString()} - ${lookupDate} EST`)
            //                     .then(liveTopic => console.log(`Channel (375399716588093440)'s new topic is ${liveTopic.topic}`))
            //                     .catch(console.error);
                    

            // client.config.channels.t2.forEach(async function (channel) {
            //     await sleep(1500).then(() => {      
            //         let lookupDate = moment().tz('America/New_York').format('h:mm a');

            //         if (client.channels.get(channel.id)){
            //             client.channels.get(channel.id).setTopic(`${channelTopic.toString()} - ${lookupDate} EST`)
            //                     .then(liveTopic => console.log(`Channel (${channel.id})'s new topic is ${liveTopic.topic}`))
            //                     .catch(console.error);
            //         }
            //     });
            // })

        }


    }, exports.conf.interval);

}


exports.conf = {
    name: "t2-monitor",
    description: "Tribes 2 server traffic monitor. Traffic reports set as channel topics",
    enabled: false,
    interval: 600001
};
