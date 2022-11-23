const { Events } = require('discord.js');
const { consoleLogErrors, rolesChannel, releasePingRole, iDumpRole } = require('../config.json');

module.exports = {
	name: Events.MessageReactionAdd,
	async execute(reaction, user) {
		if (reaction.message.channelId == rolesChannel) {
			if(reaction._emoji.name == '🚀') {
				const member = await reaction.message.guild.members.fetch(user.id);
				member.roles.add(releasePingRole);
			}
			if (reaction._emoji.name == '🎗') {
				const member = await reaction.message.guild.members.fetch(user.id);
				member.roles.add(iDumpRole);
			}
		}
	},
};
