const { Events } = require('discord.js');
const { consoleLogErrors, rolesChannel } = require('../config.json');

module.exports = {
	name: Events.MessageReactionRemove,
	async execute(reaction, user) {
		if (reaction.message.channelId == rolesChannel) {
			if (reaction._emoji.name == '🚀') {
				const member = await reaction.message.guild.members.fetch(user.id);
				member.roles.remove('role-id');
			}
			if (reaction._emoji.name == '🎗') {
				const member = await reaction.message.guild.members.fetch(user.id);
				member.roles.remove('role-id');
			}
		}
	},
};
