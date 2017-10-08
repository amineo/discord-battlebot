exports.run = (client, message, args, config) => {

  if(args.length){
    let msgCommandNotFound = "**`"+args+"` was not found!** \nHere is a list of valid BattleBot commands.";
    message.channel.send(msgCommandNotFound);
  }

  let discordMsg = {
    "embed": {
      "title": config.prefix,
      "url": "",
      "color": 15944727,
      "thumbnail": {
        "url": "https://cdn.discordapp.com/avatars/357243039783059458/93babb447e36b7e778e44078ffb2d294.png?size=256"
      },
      "author": {
        "name": "BattleBot Commands"
      },
      "fields": [
        {
          "name": "help",
          "value": "*This here command list.* All BattleBot query commands self-delete after a 5 minute timout"
        },
        {
          "name": "t2",
          "value": "Display the server populations for LAK, SCP & Taco"
        },
        {
          "name": "lak",
          "value": "Shows detailed server stats for Snap LAK Pub"
        },
        {
          "name": "scp",
          "value": "Shows detailed server stats for Snap Crackle Pub"
        },
        {
          "name": "taco",
          "value": "Shows detailed server stats for TacoStand"
        },            
        {
          "name": "midair",
          "value": "Display a summary of only populated MidAir servers"
        }      
      ]
    }
  }

  message.channel.send(discordMsg);

}