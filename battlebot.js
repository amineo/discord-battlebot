/*
 * BattleBot
 *
 * (c) Anthony Mineo <anthony@season4.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
 
const fs = require("fs");
const package = require("./package.json");
const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();




fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});




client.on("message", message => {


  if (message.author.bot) return;
  if( message.content.indexOf(config.prefix) !== 0) return;

  // Define command args
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile;
    if(message.content == config.prefix){
      // The !battlebot default command
      commandFile = require(`./commands/t2.js`);
    }else{
      commandFile = require(`./commands/${command}.js`);
    }

    commandFile.run(client, message, args, config);
  } catch (err) {
    console.error(err);
    // fall back to help if command is not valid
    let injectArgs = args;
    injectArgs.push(`${config.prefix} ${command}`);
    let commandFile = require(`./commands/help.js`);
    commandFile.run(client, message, injectArgs, config);
  }
});





client.on("ready", () => {
  console.log(`BattleBot started! v${package.version}`);
  client.user.setGame(`${config.prefix} help`)
});

client.login(process.env.DISCORD_TOKEN);