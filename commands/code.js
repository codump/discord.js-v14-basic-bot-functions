const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Show how to use code on discord.')
		.addUserOption(option => option.setName('target').setDescription('Mention the member.').setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x00b646)
			.addFields(
				{ name: '\u200B', value: 'To use it you have to type 3 backticks followed by the language. Then press enter, paste your code and close it with another 3 backticks.\n\n*Example:*\n\n**\\`\\`\\`javascript\n\n// code here //\n\n\\`\\`\\`**\n\n*You can copy and paste the code above, change javascript to the programming language you are posting.*' },

			);

		if (member == null) {
			return interaction.reply({ content: `Please post your code with the built in syntax highlighting of discord.`, embeds: [exampleEmbed], ephemeral: false });
		} else {
			return interaction.reply({ content: `<@${member.user.id}>, please post your code with the built in syntax highlighting of discord.`, embeds: [exampleEmbed], ephemeral: false });
		}
	},
};
