const { Events } = require('discord.js');
const { consoleLogErrors, guildId, byeChannel } = require('../config.json');

module.exports = {
	name: Events.GuildMemberRemove,
	async execute(member) {
		const user_id = member.user.id;
		const channel = member.client.guilds.cache.get(guildId).channels.cache.get(byeChannel);

		try {
			await channel.send(`Bye <@${user_id}>!`);
		} catch (error) {
			if (consoleLogErrors == "true") {
				console.error(error);
			}
		}
	},
};
