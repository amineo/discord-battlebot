const { Attachment } = require('discord.js');

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
        "url": `https://t2-server-xbar.herokuapp.com/?t=${cacheBust}&padding=0`,
      },
      "timestamp": new Date(),
    }
  }
 await message.channel.send(discordMsg);
*/


 const attachment = new Attachment(`http://t2-server-xbar.herokuapp.com/${cacheBust}/serverName/Discord%20PUB/padding/0/image.png`, `${cacheBust}.png`);
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
  message.delete(customTimeout ? customTimeout : config.messageDeleteTimer.command);
  botmessage.delete(customTimeout ? customTimeout : config.messageDeleteTimer.bot);
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