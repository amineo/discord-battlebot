module.exports = (client) => {



  // Logging
  client.log = (type, msg, title) => {
    if (!title) title = "Log";
    console.log(`[${type}] [${title}] ${msg}`);
  };



  // Load commands and store them in loki
  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);

      if(props.conf.enabled){
        client.log("log", `✅  Loading Command: ${props.help.name}`);
        client.commands.insert({
          name: props.help.name,
          props: props
        });
        props.conf.aliases.forEach(alias => {
          client.aliases.insert({
            name: alias,
            props: props
          });
        });
      }else{
        client.log("log", `⚠️  Command Not Enabled: ${props.help.name}`);
      };

    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };
    




  // on explode
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });


  // timeout util
  client.wait = require('util').promisify(setTimeout);
}