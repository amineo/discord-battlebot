const { execFile } = require('child_process');
const BattleBot = require('../modules/BattleBot.js');

exports.run = async (client, message, args) => {
  try {
    // Query SCP
    let battlebot = new BattleBot();
    let queryArgs = { ip: '208.100.45.135:28000' };
    await battlebot.displayServerDetail(queryArgs, message, args, client.config);

  }
  catch (err) {
    console.error(err)
  }
};


exports.conf = {
  enabled: true,
  aliases: []
};


exports.help = {
  name: "scp",
  description: "Shows detailed server stats for Snap Crackle Pub",
  usage: "scp"
};