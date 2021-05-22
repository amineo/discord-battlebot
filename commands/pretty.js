exports.run = async (client, message, args) => {

  let cacheBust = new Date().getTime();

  let discordMsg = {
    "embed": { 
      "title": "Discord PUB",
      "url": "https://stats.playt2.com",
      "color": 7134102,
      "image": {
        "url": `https://t2-server-xbar.herokuapp.com/?cachebust=${cacheBust}`,
      },
      "timestamp": new Date(),
    }
  }

  await message.channel.send(discordMsg);
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