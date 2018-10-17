const BattleBot = require('../modules/BattleBot.js');

exports.run = async (client, message, args) => {
  try {
    // Query SCP
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
  aliases: ['scp', 'snap', 'sco' , 'spc', 'psc', 'crackle', 'pop', 'snapc', 'csp', 'crackpop', 'snappyboi', 'snappy', 'esceepay']
};


exports.help = {
  name: "scp",
  description: "Shows detailed server stats for Snap Crackle Pub",
  usage: "scp"
};
