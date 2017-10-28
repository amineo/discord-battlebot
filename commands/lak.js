const { execFile } = require('child_process');
const BattleBot = require('../modules/BattleBot.js');

exports.run = async (client, message, args) => {
  try {
    // Query LAK
    let battlebot = new BattleBot();
    let queryArgs = { ip: '67.222.138.13:28000' };
    await battlebot.displayServerDetail(queryArgs, message, args, client.config);

  }
  catch (err) {
    console.error(err)
    await message.channel.send("Something went wrong...").catch(console.error);
  }
};


exports.conf = {
  enabled: true,
  aliases: ['slp']
};


exports.help = {
  name: "lak",
  description: "Shows detailed server stats for Snap LAK Pub",
  usage: "lak"
};