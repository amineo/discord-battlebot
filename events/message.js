module.exports = (client, message) => {

    // abort response if a bot tries to run commands to BattleBot
    if (message.author.bot) return;
  
    const settings = client.config;

    // ignore any message that does not start with our prefix
    //if (message.content.indexOf(settings.prefix) !== 0) return;
    
    let rootPrefix;
    settings.prefix.forEach(function (prefix) {
      if (message.content.indexOf(prefix) !== 0){
        return;
      }else{
        rootPrefix = prefix;
      }
    });
 
    if(!rootPrefix) return;

    // Define command args
    const args = message.content.slice(rootPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase().replace(/[^a-zA-Z0-9 !?]+/g,'');


    // query loki for any commands that have been stored
    let getCommand = client.commands.find({'name':command})[0] || client.aliases.find({'name':command})[0];
 
  if (message.content == rootPrefix){
      // setup our default command if just our prefix was called
      getCommand = client.commands.find({'name':'t2'})[0];
    }else if(!getCommand){
      // if a command does not exist... fallback to help
      let injectArgs = args;
      injectArgs.push(`${rootPrefix} ${command}`);
      getCommand = client.commands.find({'name':'help'})[0];
    }

    
    const runCommand = getCommand ? (getCommand = getCommand.props) : '';
    // abort if we get this far and don't have a command ready
    if (!runCommand) return;

    runCommand.run(client, message, args);
};