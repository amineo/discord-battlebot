module.exports = async client => {

  await client.wait(1000);

  client.db.saveDatabase(function(err) {
    console.log( err ? "error prepping Loki!" : "LokiJS prepped!");
  });


  client.log("log", ` ${client.user.tag} (${client.config.version}) ready!  Serving ${client.users.size} users in ${client.guilds.size} servers.`, "Ready!");

  client.user.setActivity(`${client.config.prefix[0]} help`);
};