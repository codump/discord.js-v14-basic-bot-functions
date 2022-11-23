const { Events } = require('discord.js');
const { consoleLogErrors, guildId, welcomeChannel } = require('../config.json');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const user_id = member.user.id;
		const channel = member.client.guilds.cache.get(guildId).channels.cache.get(welcomeChannel);
		const memberCount = member.guild.memberCount;

		try {
			await channel.send(`Welcome <@${user_id}> you are member number ${memberCount}`);
		} catch (error) {
			if (consoleLogErrors == "true") {
				console.error(error);
			}
		}
	},
};
