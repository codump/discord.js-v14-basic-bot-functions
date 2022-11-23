const { Events } = require('discord.js');
const { consoleLogErrors, guildId, livestreamChannel } = require('../config.json');

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		if (newState.streaming == true && oldState.streaming == false) {
			const channel = newState.client.guilds.cache.get(guildId).channels.cache.get(livestreamChannel);
			const user_id = newState.id;
			let user = newState.client.users.cache.get(user_id);
			const username = user.username;

			channel.send({
				content: `<@${user_id}> just went live!`
			});
			console.log('STREAM ON');
		}
	},
};
