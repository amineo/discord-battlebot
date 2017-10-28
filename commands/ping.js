exports.run = async (client, message, args) => {
    await message.channel.send("pong!").catch(console.error);
}

exports.conf = {
    enabled: false,
    aliases: []
};
  
exports.help = {
    name: "ping",
    description: "PONG!",
    usage: "ping"
};