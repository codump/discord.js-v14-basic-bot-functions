const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jsfiddle')
		.setDescription('Ask to make a jsfiddle.')
		.addUserOption(option => option.setName('target').setDescription('Mention the member.').setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		if (member == null) {
			return interaction.reply({ content: `It's easier to help you if you make a fiddle on: https://jsfiddle.net/ that reproduces the problem you encounter. Don't forget to save on the top left corner and then share the URL with us.`, ephemeral: false });
		} else {
			return interaction.reply({ content: `<@${member.user.id}>, it's easier to help you if you make a fiddle on: https://jsfiddle.net/ that reproduces the problem you encounter. Don't forget to save on the top left corner and then share the URL with us.`, ephemeral: false });
		}
	},
};
