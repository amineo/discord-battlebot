const QueryList = require('../modules/QueryList.js');
const moment = require('moment-timezone');


var isPaused = false;
var time = 0;


exports.run = async (client, message, args) => {
  


    if(args[0] == "start"){
        isPaused = false;
    };
    if(args[0] == "stop"){
        isPaused = true;
    };


    let t = setInterval(async function () {
      if (!isPaused) {
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
    }, 5000);


    
};

exports.conf = {
  enabled: true,
  aliases: []
};



exports.help = {
  name: "monitor",
  description: "Monitor T2",
  usage: "monitor"
};