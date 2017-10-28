const { execFile } = require('child_process');
const BattleBot = require('../modules/BattleBot.js');

exports.run = async (client, message, args) => {
  try {
    // Query TacoStand
    let battlebot = new BattleBot();
    let queryArgs = { ip: '67.222.138.12:28000' };
    await battlebot.displayServerDetail(queryArgs, message, args, client.config);

  }
  catch (err) {
    console.error(err)
  }
};


exports.conf = {
  enabled: false,
  aliases: []
};


exports.help = {
  name: "taco",
  description: "Shows detailed server stats for TacoStand",
  usage: "taco"
};