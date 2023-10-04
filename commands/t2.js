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
    if(server.status === 'online'){
      let objServer = {
        "name": `${server.name}`,
        "value": `(${server.numplayers} / ${server.maxplayers}) ${server.map} - *${server.rules.mission}*`,
        "inline": false
      }
      discordTable.push(objServer);
    }else{
      let objServer = {
        "name": `${server.command.toUpperCase()}`,
        "value": `**OFFLINE** - _${server.address}_`,
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
  

};


exports.conf = {
  enabled: true,
  aliases: []
};



exports.help = {
  name: "t2",
  description: "Display the server populations for monitored T2 servers",
  usage: "t2"
};