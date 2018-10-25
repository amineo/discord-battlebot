/*
 * BattleBot
 *
 * (c) Anthony Mineo <anthony@season4.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
 
const { promisify } = require('util');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const loki = require('lokijs');
const LokiFSStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');

const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require('./config.js');
require('./modules/utils.js')(client);




if (!fs.existsSync('./storage')){
  fs.mkdirSync('./storage');
}

// setup our persistence storage layer
client.db = new loki('storage/battlebot.db', {
  adapter: new LokiFSStructuredAdapter(),
  verbose: true,
  autosave: true
});


// Setup our loki collections
client.commands = client.db.getCollection('commands') || client.db.addCollection('commands', {
  unique: ["name"],
  autoupdate: true
});
client.aliases = client.db.getCollection('aliases') || client.db.addCollection('aliases', {
  unique: ["name"],
  autoupdate: true
});
client.monitors = client.db.getCollection('monitors') || client.db.addCollection('monitors', {
  unique: ["name"],
  autoupdate: true
});
client.notifications = client.db.getCollection('notifications') || client.db.addCollection('notifications', {
  unique: ["name"],
  autoupdate: true
});


const init = async () => {

  // Load our commands
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(file => {
    if (!file.endsWith(".js")) return;
    const response = client.loadCommand(file);
    if (response) console.log(response);
  });



  // Load our event handlers
  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);

  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });



  // Load our Monitors
  const monitorFiles = await readdir("./monitors/");
  client.log("log", `Loading a total of ${monitorFiles.length} monitors.`);

  monitorFiles.forEach(file => {
    if (!file.endsWith(".js")) return;
    const response = client.loadMonitor(file);
    if (response) console.log(response);
  });

  


  // Log the bot in
  client.login(client.config.DISCORD_TOKEN);
};
init();