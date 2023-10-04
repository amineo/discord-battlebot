const QStatQuery = require('./Query.js');



class BattleBot {

  displayServerDetail(queryArgs, message, args, config){

    let query = new QStatQuery(queryArgs);
    let serverInfo = [];
    let discordTable = [];
    
    const response = query.run(function(err, results) {
      if (err) throw err;
    

      let data = JSON.parse(results)[0];
      let lookupDate = new Date();


      if(data.status === 'online'){

        let discordMsg = {
          "embed": {
            "title": data.map,
            "url": "http://www.maxogc.net/tribes/t2/index.php?server="+queryArgs.ip,
            "description": data.rules.mission + " - " + data.rules.game,
            "color": 9551472,
            "timestamp": lookupDate.toISOString(),
            "author": {
              "name": data.name
            }
          }
        };
    
  
  
  
    
    
        data.teams.forEach(function (team) {
          let objTeam = {
            "name": team.team,
            "value": team.score,
            "inline": true
          }
          discordTable.push(objTeam);
        });
    
    
  
    
    
        let playerOverview = {
          "name": "Players: "+ data.numplayers +"/"+ data.maxplayers +" ("+ data.rules.bot_count +")",
          "value": "---"
        }
        discordTable.push(playerOverview);
    
    
  
    
        data.players.forEach(function (player) {
          let playerObj = {
            "name": `${player.name}`,
            "value": `${player.score} -  _${player.team}_`,
            "inline": true
          }
            discordTable.push(playerObj);
        });
    
    
    
        discordMsg["embed"]["fields"] = discordTable;

        message.channel.send(discordMsg).then(function (botmessage) {
          let customTimeout;

          // Abort out if we want this message to be posted indefinitely
          if (args.indexOf('post') > -1 || args.indexOf('sticky') > -1 ){
            return;
          }

          if (Number.isInteger(parseInt(args[0])) && parseInt(args[0]) <= 120){
            customTimeout = (parseInt(args[0]) * 60000);
          };

          // cleanup messages after 5 minutes
          message.delete({timeout: customTimeout ? customTimeout : config.messageDeleteTimer.command});
          botmessage.delete({timeout: customTimeout ? customTimeout : config.messageDeleteTimer.bot});
        });
      
      }else{
        // Report if the server is offline
        let discordMsg = {
          "embed": {
            "title": data.address,
            "url": "http://www.maxogc.net/tribes/t2/index.php?server=" + queryArgs.ip,
            "description": "I can't reach this server...",
            "color": 15937414,
            "timestamp": lookupDate.toISOString(),
            "author": {
              "name": `${queryArgs.command.toUpperCase()} (OFFLINE)`
            }
          }
        };

        message.channel.send(discordMsg);
      }
  

    });
  }
}
module.exports = BattleBot;