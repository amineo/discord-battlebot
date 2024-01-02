const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
	const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');



	await message.channel.send(
		`= BattleBot  :: v${client.config.version} =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.cache.size}
• Servers    :: ${client.guilds.cache.size}
• Channels   :: ${client.channels.cache.size}
• Discord.js :: v${version}
• Node       :: ${process.version}`,
		{ code: 'asciidoc' }
	);
};

exports.conf = {
	enabled: true,
	aliases: []
};

exports.help = {
	name: 'info',
	description: 'Display how the toaster is running  🤓',
	usage: 'info'
};
