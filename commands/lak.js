const { execFile } = require('child_process');
const BattleBot = require('../modules/BattleBot.js');

exports.run = (client, message, args, config) => {
  // Query LAK
  let battlebot = new BattleBot();
  let queryArgs = { ip: '67.222.138.13:28000' };
  battlebot.displayServerDetail(queryArgs, message, args, config);
};