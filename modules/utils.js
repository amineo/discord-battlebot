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
    


  // Load monitors and store them in loki
  client.loadMonitor = (monitorName) => {
    try {
      const props = require(`../monitors/${monitorName}`);

      if (props.conf.enabled) {
        client.log("log", `✅  Loading Monitor: ${props.conf.name}`);

        client.monitors.insert({
          name: props.conf.name,
          props: props
        });

        props.run(client);

      } else {
        client.log("log", `⚠️  Monitor Not Enabled: ${props.conf.name}`);
      };

    } catch (e) {
      return `Unable to load command ${monitorName}: ${e}`;
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