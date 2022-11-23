const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('automsgmention')
		.setDescription('Mention a user in an automated message.')
		.addUserOption(option => option.setName('target').setDescription('Mention the member.').setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		if (member == null) {
			return interaction.reply({ content: `this is a automated message. You could point to a specific channel like so: <#channel-id> for example a reminder to the rules. Or to point people to the correct channel with a longer description so you and your staff don't have to type it over and over again..`, ephemeral: false });
		} else {
			return interaction.reply({ content: `<@${member.user.id}>, this is a automated message. You could point to a specific channel like so: <#channel-id> for example a reminder to the rules. Or to point people to the correct channel with a longer description so you and your staff don't have to type it over and over again..`, ephemeral: false });
		}
	},
};
