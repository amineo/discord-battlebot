const QueryList = require('../modules/QueryList.js');
const moment = require('moment-timezone');



function displayNotification(client, data){
    console.log('Display notification');

    client.config.notify.roleIDs.forEach(function(roleID){
        let lookupDate = moment().toISOString();
        let discordMsg = {
            "embed": {
                "title": data.gameType,
                "description": "**"+data.players + " Players** on " + data.map,
                "color": 14090747,
                "timestamp": lookupDate,
                "author": {
                    "name": data.name
                },
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/avatars/357243039783059458/93babb447e36b7e778e44078ffb2d294.png?size=256",
                    "text": "You can opt-in/out of notifications with !bb notify yes/no"
                }
            }
        };

        // then get each channels.t2 and see if the notifyIDs match
        client.config.channels.t2.forEach(function(channel){
            if(roleID === channel.notifyID){
                client.channels.get(channel.id).send(`<@&${roleID}>`, discordMsg);
            }
        });
 
    });
}



exports.run = async (client) => {
    let enabled = exports.conf.enabled;
    let time = 0;

    let t = setInterval(async function () {
        if (enabled) {
            let queryServerList = new QueryList(client.config.t2ServerList);
            let serverInfo = await queryServerList.queryList();

            time++;
            console.log("Query: " + time);

    
            let channelTopic = [];
            let lookupDate = moment().tz('America/New_York').format('h:mm a');
            serverInfo.forEach(function (server) {
                if (server.status === 'online') {
                    let topic = ` ${server.command.toUpperCase()} [${server.numplayers} / ${server.maxplayers}]`;
                    channelTopic.push(topic);
                } else {
                    let topic = ` ${server.command.toUpperCase()} [DOWN]`;
                    channelTopic.push(topic);
                }
                
                console.log('Debug Server query object:')
                console.log(server);
                console.log('----');
                // Role-based notifications
                let serverSnapshot = {
                    name: server.name || '',
                    map: server.map || '',
                    gameType: server.rules.mission || '',
                    players: server.numplayers
                };
                serverSnapshot['lastChecked'] = new Date;


                let notification = client.notifications.findObject({ 'name': serverSnapshot.name });
                
                //  
                // TODO: This is a proof of concept and needs to get refactored into a much cleaner way.
                //       This should all be moved into a class with methods for checking and notifying 
                //

                if (notification) {

                    if(client.config.notify.playerThreshold > notification.players){
                        console.log(`Not enough players on ${serverSnapshot.name} to notify roles`);
                        serverSnapshot['hasNotified'] = false;
                        return;
                    }
                    console.log('We have enough players! Checking diff...');
                  
     
                    let notificationDate = moment(notification.lastChecked);
                    let snapshotDate = moment(serverSnapshot.lastChecked);
                    let dateDiff = snapshotDate.diff(notificationDate, 'minutes');
                    let playerDiff = Math.abs(serverSnapshot.players - notification.players);

                    // if(notification.map === serverSnapshot.map && 
                    //    serverSnapshot.players >= notification.players){
                    if(!notification.hasNotified){
                        console.log('First Notification');
                        serverSnapshot['$loki'] = notification['$loki'];
                        serverSnapshot['meta'] = notification['meta'];
                        serverSnapshot['hasNotified'] = true;
                        client.notifications.update(serverSnapshot);

                        // Notify
                        displayNotification(client, serverSnapshot);

                    } else if( serverSnapshot.players > notification.players && playerDiff >= 2){
                        // playerDiff or dateDiff?
                            serverSnapshot['$loki'] = notification['$loki'];
                            serverSnapshot['meta'] = notification['meta'];
                            serverSnapshot['hasNotified'] = true;

                            client.notifications.update(serverSnapshot);

                            // Notify
                            displayNotification(client, serverSnapshot);

                       // }
                    } else if( serverSnapshot.map != notification.map){
                        console.log('Map changed, lets let people know we still got a game going next check');
                        // Map has rotated and player count has grown
                        serverSnapshot['$loki'] = notification['$loki'];
                        serverSnapshot['meta'] = notification['meta'];
                        serverSnapshot['hasNotified'] = false;
                        client.notifications.update(serverSnapshot);
                    }else{
                        console.log('No changes to notify about');
                    }



                } else {
                    console.log('Entry for ' + serverSnapshot.name + ' does not exist creating db entry');
                    serverSnapshot['hasNotified'] = false;
                    client.notifications.insert(serverSnapshot);
                };
                
                //console.log( client.notifications.find({ 'name': { '$eq' : serverSnapshot.name } }));
                console.log('-----');
                /*
                client.config.notify.playerThreshold
                let notificationsRole = message.guild.roles.find(role => role.name === client.config.notify.role);    
                
                - store in lokiJS
                    - name as ID
                    - last checked time
                    - map
                    - game type
                    - user count
                Conditions
               []  if the map is the same and user count is == then dont notify.
               [] if the usercount has grown by >= 2 and last checked time was >= 5 minutes notify the roles 

                */

            });

            client.config.channels.t2.forEach(function (channel) {
                if (client.channels.get(channel.id)){
                    client.channels.get(channel.id).setTopic(`${channelTopic.toString()} - ${lookupDate} EST`)
                        .then(liveTopic => console.log(`Channel (${channel.id})'s new topic is ${liveTopic.topic}`))
                        .catch(console.error);
                }
                client.wait(500);
            })

        }
    }, exports.conf.interval);




}

exports.conf = {
    name: "t2-monitor",
    description: "Tribes 2 server traffic monitor. Traffic reports set as channel topics",
    enabled: true,
    interval: 30000
};
