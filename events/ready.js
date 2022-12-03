const { Events, ActivityType } = require('discord.js');
const { default: mongoose } = require('mongoose');

const { mongoURI } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		await mongoose.connect(mongoURI, { keepAlive: true });
		
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(`codump.github.io`, {
			type: ActivityType.Watching, url: 'https://codump.github.io'
		});
	},
};
