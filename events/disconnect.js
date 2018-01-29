module.exports = async client => {

  await client.wait(1000);


  client.log("log", " Lost connection to Discord! ", "Attemping to reconnect...");
  
  // Log the bot in
  client.login(client.config.DISCORD_TOKEN);

};