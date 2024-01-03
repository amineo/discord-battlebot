const { MessageAttachement } = require('discord.js');

exports.run = async (client, message, args) => {

  const cacheBust = new Date().getTime();
  const config = client.config;
/*
  let discordMsg = {
    "embed": { 
      "title": "Discord PUB",
      "url": "https://stats.playt2.com",
      "color": 7134102,
      "image": {
        "url": `https://t2-server.fly.dev/?t=${cacheBust}&padding=0`,
      },
      "timestamp": new Date(),
    }
  }
 await message.channel.send(discordMsg);
*/

// const attachment = new MessageAttachement(`https://t2-server.fly.dev/${cacheBust}/serverName/24%2F7%20Tribes/padding/0/image.png`, `${cacheBust}.png`);

  const defaultServer = `24/7 Tribes`;

  const serverQueryName = args.length ? args.join(' ') : defaultServer;

  const attachment = `https://t2-server.fly.dev/${cacheBust}/serverName/${encodeURIComponent(serverQueryName)}/padding/0/image.png`;

 await message.channel.send('', {files: [attachment]}).then( function(botmessage){
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

}


exports.conf = {
  enabled: true,
  aliases: []
};



exports.help = {
  name: "pretty",
  description: "*Return a pretty image the player list for Discord PUB*",
  usage: "pretty"
};