const { execFile } = require('child_process');
const QStatQuery = require('../modules/Query.js');


exports.run = (client, message, args, config) => {

  let serverInfo = [],
      discordTable = [];
  

  
  function queryServer(server) {
    console.log(`Async Query ${server.ip} started`);
    let query = new QStatQuery(server).run(function(err, data) {
      if (err) throw err;
      serverInfo.push(JSON.parse(data)[0]);
      serverQue.next();
    });
  }
  
  
  

  function* syncQueries(){
    for (var server of config.t2ServerList) {
      yield queryServer(server);
    }
    let lookupDate = new Date();
    console.log( `Query que completed: ${lookupDate}` );
    T2QueryOutput();
  }
  
  
  
  
  
  var serverQue = syncQueries();
  serverQue.next(); // start que






  
  // T2 Server List Query Output
  const T2QueryOutput = function(){
  
      let lookupDate = new Date();
      let discordMsg = {
        "embed": {
          "title": "T2 Servers",
          "color": 1946747,
          "timestamp": lookupDate.toISOString()
        }
      };
  
      serverInfo.forEach(function (server) {
        if(server.players !== 0){
            let objServer = {
                "name": `${server.name}`,
                "value": `(${server.numplayers} / ${server.maxplayers}) ${server.map}`,
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
  
  };

};