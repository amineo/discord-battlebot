const request = require('request');

exports.run = async (client, message, args) => {
	await request(`https://api.playt2.com/games?limit=5`, function(error, response, body) {
		displayStats(JSON.parse(body));
	});

	function displayStats(stats) {
		console.log(stats);

		let lookupDate = new Date();
		let discordTable = [];
		let discordMsg = {
			embed: {
				title: `Last ${stats.length} games`,
				color: 8615418,
				timestamp: lookupDate.toISOString()
			}
		};

		stats.map((game) => {
			let statLine = {
				name: `${game.map}`,
				value: `**[View](https://stats.playt2.com/game/${game.gameId})**`,
				inline: false
			};
			discordTable.push(statLine);
		});

		discordMsg['embed']['fields'] = discordTable;

		message.channel.send(discordMsg);
	}
};

exports.conf = {
	enabled: true,
	aliases: []
};

exports.help = {
	name: 'stats',
	description: 'Latest stats from stats.playt2.com',
	usage: 'stats'
};
