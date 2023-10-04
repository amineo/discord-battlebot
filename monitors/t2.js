const QueryList = require("../modules/QueryList.js");
const Twitch = require('../modules/Twitch.js');
const moment = require("moment-timezone");
const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

exports.run = (client) => {
  const topicMonitorServerList = client.config.t2ServerList.filter(
    (server) => server.monitor === true
  );
  const queryServerList = new QueryList(topicMonitorServerList);

  let queryIteration = 0;

  setInterval(async function () {
    const twitch = new Twitch();
    const streams = await twitch.getT2Streams();

    const twitchMessage = streams.data.length === 0
        ? ""
        : `- :tv: Streams: [${streams.data.length}]`;

    console.log(twitchMessage);


    // Add only if topic monitor is enabled for the server
    const serverInfo = await queryServerList.queryList();



    let channelTopic = [];

    queryIteration++;

    if (exports.conf.enabled) {
      serverInfo.forEach(function (server, i) {
        if (server.status === "online") {
          let topic = {
            players: server.numplayers,
          };
          if (server.numplayers >= 2) {
            topic["text"] = `${server.command.toUpperCase()} [${
              server.numplayers
            } / ${server.maxplayers}] ${server.rules["mission"]} :: ${
              server.map
            }`;
          } else {
            topic["text"] = `${server.command.toUpperCase()} [${
              server.numplayers
            } / ${server.maxplayers}]`;
          }
          channelTopic.push(topic);
        } else {
          let topic = {
            players: 0,
            text: `${server.command.toUpperCase()} [DOWN]`,
          };
          channelTopic.push(topic);
          console.log("Having issues reaching server:" + server.command);
          console.log("Status:" + server.status);
          return;
        }
      });

      client.config.channels.t2.forEach(async function (channel) {
        // await sleep(50).then(() => {
        // });
        let lookupDate = moment().tz("America/New_York").format("h:mm a");
        let nextLookupDate = moment()
          .add(5, "minutes")
          .tz("America/New_York")
          .format("h:mm a");

        if (client.channels.cache.get(channel.id)) {
          let sortedTopicMonitors = [];

          channelTopic = channelTopic.sort(function (a, b) {
            return b.players - a.players;
          });

          channelTopic.map((monitor) => {
            sortedTopicMonitors.push(monitor.text);
          });

          client.channels.cache.get(channel.id)
           // .setTopic(`${sortedTopicMonitors.toString().replace(","," • ")} - ${lookupDate} EST; Next lookup at ${nextLookupDate} EST`)
            .setTopic(
              `${sortedTopicMonitors
                .toString()
                .replace(
                  ",",
                  " • "
                )} ${twitchMessage} - ${lookupDate} EST; Next lookup at ${nextLookupDate} EST`
            )

            .then((liveTopic) =>
              console.log(
                `Channel (${channel.id})'s new topic is ${liveTopic.topic}`
              )
            )
            .catch(console.error);
        }
      });
    }
  }, exports.conf.interval);
};

// 6 minute intervals 360000
exports.conf = {
  name: "t2-monitor",
  description: "Tribes 2 server traffic monitor. Traffic reports set as channel topics",
  enabled: true,
  interval: 360000,
};
