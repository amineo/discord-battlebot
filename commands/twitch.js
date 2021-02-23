const fetch = require("node-fetch");
const moment = require("moment-timezone");

exports.run = async (client, message, args) => {
  await fetch("https://api.twitch.tv/kraken/streams/?game=Tribes%202", {
    method: "get",
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
  })
    .then((res) => res.json())
    .then((streams) => displaySummary(streams));

  function displaySummary(streams) {
    console.log(streams);

    let twitchStreams = streams.streams;
    let lookupDate = new Date();
    let discordTable = [];
    let discordMsg = {
      embed: {
        title: "Live Twitch Streams",
        color: 8615418,
        timestamp: lookupDate.toISOString(),
      },
    };

    twitchStreams.forEach(function (stream) {
      let objServer = {
        name: `${stream.channel.display_name}`,
        value: `**[Watch Live](${stream.channel.url})**\n\`started: ${moment(
          stream.created_at
        )
          .tz("America/New_York")
          .format("MMMM Do YYYY, h:mm:ss a")} EST\`\n--\n`,
        inline: false,
      };
      discordTable.push(objServer);
    });

    discordMsg["embed"]["fields"] = discordTable;

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
  }
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
