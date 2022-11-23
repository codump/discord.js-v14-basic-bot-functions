const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option => option.setName('target').setDescription('The member to ban.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
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
					content: "ERROR: You cannot ban yourself!",
					ephemeral: true
				})
			case (member.id = clientId):
				return interaction.reply({
					content: "ERROR: You cannot ban me!",
					ephemeral: true
				})
			case (member.roles.highest.position >= interaction.member.roles.highest.position):
				return interaction.reply({
					content: "ERROR: I can't ban this user, because he's higher than you!",
					ephemeral: true
				})
			case (!member.bannable):
				return interaction.reply({
					content: "ERROR: I can't ban this user!",
					ephemeral: true
				})
			default:
				const reason = interaction.options.getString("reason");
				const admin = interaction.user.tag;

				await interaction.reply({
					content: `<@${member.user.id}> has been banned.`,
					ephemeral: true
				})

				await member.ban({ reason: `By: ${admin} Reason: ${reason}` });
				break;
		}
	},
};
