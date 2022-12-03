const { SlashCommandBuilder } = require('discord.js');
const { consoleLogErrors } = require('../config.json');

const warningSchema = require('../schema/warn-schema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warning')
		.setDescription('Give user a warning.')
		.addUserOption(option => option.setName('target').setDescription('Target the member.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason of the warning').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const reason = interaction.options.getString("reason");

		let countUser = await warningSchema.count({ user: member });
		let getUser = await warningSchema.find({ user: member }, 'user count reasons');

		if (countUser == 0) {

			await new warningSchema({
				user: member,
				count: 1,
				reasons: reason
			}).save();
			await interaction.reply({
				content: `**<@${member.user.id}> this is an official warning!** Reason: ${reason}.`,
				ephemeral: false
			});
			await interaction.followUp({
				content: `Warning submitted\n\n*No warning history.*`,
				ephemeral: true
			});

		} else {

			for (let userIndex = 0; userIndex < countUser; userIndex++) {
				const warningRecordId = getUser[userIndex]._id;
				const whoIs = getUser[userIndex].user;
				const reasonCount = getUser[userIndex].count;
				global.theReasons = getUser[userIndex].reasons;
				let newRcount = reasonCount + 1;
				let warningRecord = await warningSchema.findById(warningRecordId);
				if (consoleLogErrors == "true") {
					if (!warningRecord) {
						console.log(`No warningRecordId found.`);
					}
				}
				warningRecord.set({ count: newRcount });
				warningRecord.reasons.push(reason);
				await warningRecord.save();

			}
			await interaction.reply({
				content: `**<@${member.user.id}> this is an official warning!** Reason: ${reason}.`,
				ephemeral: false
			});
			const showReasons = theReasons.join().replace(/,/g, "\n--------------------------------\n");
			await interaction.followUp({
				content: `Warning submitted\n\n**Members warning history:**\n--------------------------------\n${showReasons}`,
				ephemeral: true
			});

		}


	},
};
