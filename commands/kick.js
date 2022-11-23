const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them.')
		.addUserOption(option => option.setName('target').setDescription('The member to kick.').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		switch (member.id) {
			case (!member):
				return interaction.reply({
					content: "ERROR: Cannot find this user!",
					ephemeral: true
				})
			case (interaction.member.id):
				return interaction.reply({
					content: "ERROR: You cannot kick yourself!",
					ephemeral: true
				})
			case (member.id = clientId):
				return interaction.reply({
					content: "ERROR: You cannot kick me!",
					ephemeral: true
				})
			case (member.roles.highest.position >= interaction.member.roles.highest.position):
				return interaction.reply({
					content: "ERROR: I can't kick this user, because he's higher than you!",
					ephemeral: true
				})
			case (!member.bannable):
				return interaction.reply({
					content: "ERROR: I can't kick this user!",
					ephemeral: true
				})
			default:

				await interaction.reply({
					content: `<@${member.user.id}> has been kicked.`,
					ephemeral: true
				})

				await member.kick();
				break;
		}
	},
};
