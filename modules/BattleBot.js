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
  
  
      message.channel.send(discordMsg).then(function(botmessage){
          // cleanup messages after 5 minutes
          message.delete(config.messageDeleteTimer.command);
          botmessage.delete(config.messageDeleteTimer.bot);
      });
    });
  }
}
module.exports = BattleBot;