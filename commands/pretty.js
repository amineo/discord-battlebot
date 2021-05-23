const { Attachment } = require('discord.js');

exports.run = async (client, message, args) => {

  const cacheBust = new Date().getTime();
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
 await message.channel.send('', {files: [attachment]});

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