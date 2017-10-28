module.exports = async client => {

  await client.wait(1000);

  client.log("log", ` ${client.user.tag} (${client.config.version}) ready!  Serving ${client.users.size} users in ${client.guilds.size} servers.`, "Ready!");

  client.user.setGame(`${client.config.prefix} help`);
};