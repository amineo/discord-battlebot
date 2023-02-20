const moment = require("moment-timezone");

exports.run = async (client, message, args) => {
  const Twitch = require('../modules/Twitch.js');
  const twitch = new Twitch();
  const streams = await twitch.getT2Streams();

  if(streams.data.length === 0) {
    message.channel.send(`No streams found :(`);
    return;
  }

  streams.data.forEach(function (stream) {
    const thumbnail_url = stream.thumbnail_url.replace( /{width}x{height}/g, '480x270' );
    const discordMsg = {
      embed: {
        "type": "rich",
        "title": stream.title,
        "description": '',
        "color": 0x9246ff,
        "timestamp": moment(stream.started_at),
        "image": {
          "url": thumbnail_url,
          "height": 480,
          "width": 270
        },
        "author": {
          "name": stream.user_name
        },
        "footer": {
          "text": `Tribes 2`
        },
        "url": `https://twitch.tv/${stream.user_login}`
      }
    }


    message.channel.send(discordMsg).then(function (botmessage) {
      let customTimeout;

      // Abort out if we want this message to be posted indefinitely
      if (args.indexOf("post") > -1 || args.indexOf("sticky") > -1) {
        return;
      }

      if (Number.isInteger(parseInt(args[0])) && parseInt(args[0]) <= 120) {
        customTimeout = parseInt(args[0]) * 60000;
      }

      // cleanup messages after 5 minutes
      message.delete(
        customTimeout ? customTimeout : client.config.messageDeleteTimer.command
      );
      botmessage.delete(
        customTimeout ? customTimeout : client.config.messageDeleteTimer.bot
      );
    });
  });
};

exports.conf = {
  enabled: true,
  aliases: ["streams"],
};

exports.help = {
  name: "twitch",
  description: "Display a list of Tribes 2 Twitch streams",
  usage: "twitch",
};
