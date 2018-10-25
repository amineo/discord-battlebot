exports.run = async (client, message, args) => {

    let notificationsRole = message.guild.roles.find(role => role.name === client.config.notify.role);
    
    let optStatus = args[0];

    // Default to optin with no params attached to command
    if(!optStatus){
        optStatus = 'optin';
    }

    if(client.config.notify.optinKeywords.includes(optStatus.toLowerCase())){
        message.member.addRole(notificationsRole);
        await message.channel.send(`**${message.member.displayName}**, you've been opted into role based  notifications for when a servers population hits its threshold. You can opt-out with **${client.config.prefix[0]} notify optout**`).catch(console.error);
    }

    if(client.config.notify.optoutKeywords.includes(optStatus.toLowerCase())){
        message.member.removeRole(notificationsRole);
        await message.channel.send(`**${message.member.displayName}**, you've been opted out of notifications. You can opt back in with **${client.config.prefix[0]} notify**`).catch(console.error);
    }
}

exports.conf = {
    enabled: true,
    aliases: []
};
  
exports.help = {
    name: "notify",
    description: "Add or remove the BattleBot role based notifications. The notify role is used for server population alerts.",
    usage: "notify [yes, no, optin, optout]"
};