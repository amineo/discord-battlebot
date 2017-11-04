const QueryList = require('../modules/QueryList.js');

exports.run = async (client, message, args) => {

  
  let queryServerList = new QueryList(client.config.t2ServerList);
  let serverInfo = await queryServerList.queryList();

  let lookupDate = new Date();
  let discordTable = [];
  let discordMsg = {
    "embed": {
      "title": "T2 Servers",
      "color": 1946747,
      "timestamp": lookupDate.toISOString()
    }
  };
  
  serverInfo.forEach(function (server) {
        let objServer = {
            "name": `${server.name}`,
            "value": `(${server.numplayers} / ${server.maxplayers}) ${server.map} - *${server.rules.mission}*`,
            "inline": false
        }
        discordTable.push(objServer);
  });

  discordMsg["embed"]["fields"] = discordTable;
      
  message.channel.send(discordMsg).then(function(botmessage){
    // cleanup messages after 5 minutes
    message.delete(client.config.messageDeleteTimer.command);
    botmessage.delete(client.config.messageDeleteTimer.bot);
  });
  

};


exports.conf = {
  enabled: true,
  aliases: []
};



exports.help = {
  name: "t2",
  description: "Display the server populations for LAK & SCP",
  usage: "t2"
};