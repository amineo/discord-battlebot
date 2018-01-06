const BattleBot = require('../modules/BattleBot.js');

exports.run = async (client, message, args) => {
  try {
    // Query TacoStand
    let battlebot = new BattleBot();
    let queryArgs = client.config.t2ServerList.find(bb => bb.command === exports.help.name);
    await battlebot.displayServerDetail(queryArgs, message, args, client.config);
  }
  catch (err) {
    console.error(err)
    await message.channel.send("Something went wrong..." + err).catch(console.error);
  }
};


exports.conf = {
  enabled: true,
  aliases: ['slt', 'tacostand']
};


exports.help = {
  name: "taco",
  description: "Shows detailed server stats for TacoStand",
  usage: "taco"
};