/*
 * BattleBot
 *
 * (c) Anthony Mineo <anthony@season4.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
 
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const loki = require('lokijs');

const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require('./config.js');
require('./modules/utils.js')(client);


// Setup our loki collections
var db = new loki('loki.json');
client.commands = db.addCollection('commands');
client.aliases = db.addCollection('aliases');



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



  // Log the bot in
  client.login(client.config.DISCORD_TOKEN);
};
init();