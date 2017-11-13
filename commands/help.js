exports.run = async (client, message, args) => {

  if(args.length){
    let msgCommandNotFound = "**`"+args+"` was not found!** \nHere is a list of valid BattleBot commands.";
    message.channel.send(msgCommandNotFound);
  }


  let generateHelp = [];

  client.commands.find().forEach(command => {
    let help = {
      name: command.props.help.usage,
      value: command.props.help.description
    }
    generateHelp.push(help)
  });

  let discordMsg = {
    "embed": { 
      "title": client.config.prefix.toString().replace(/,/g, ' or ') + " <command>",
      "url": "",
      "color": 15944727,
      "thumbnail": {
        "url": "https://cdn.discordapp.com/avatars/357243039783059458/93babb447e36b7e778e44078ffb2d294.png?size=256"
      },
      "author": {
        "name": "BattleBot Commands v"+client.config.version 
      }
    }
  }
  discordMsg["embed"]["fields"] = generateHelp;

  await message.channel.send(discordMsg);
}


exports.conf = {
  enabled: true,
  aliases: []
};



exports.help = {
  name: "help",
  description: "*This here command list.* All BattleBot query commands self-delete after a 5 minute timout",
  usage: "help"
};