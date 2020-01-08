const BattleBot = require('../modules/BattleBot.js');

exports.run = async (client, message, args) => {
  try {
    // Query PU
    let battlebot = new BattleBot();
    let ip_validation = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

    if(ip_validation.test(message.content.match(ip_validation))){
      let qry_IP = message.content.match(ip_validation)[0] + ':28000';
      let queryArgs = { ip: qry_IP }
      await battlebot.displayServerDetail(queryArgs, message, args, client.config);
    }else{
      await message.channel.send("Not a valid IP").catch(console.error);
    }
  }
  catch (err) {
    console.error(err)
    await message.channel.send("Something went wrong..." + err).catch(console.error);
  }
};


exports.conf = {
  enabled: true,
  aliases: ['']
};


exports.help = {
  name: "ip",
  description: "Shows detailed server stats from an IP",
  usage: "ip"
};
