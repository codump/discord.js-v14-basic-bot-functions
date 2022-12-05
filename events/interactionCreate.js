const { Client, Events, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionFlagsBits, GatewayIntentBits } = require('discord.js');
const { token, clientId, guildId, ticketChannel, ticketParent, consoleLogErrors } = require('../config.json');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) { 

		// if interaction is slashcommand //
		if (interaction.isChatInputCommand()) { 
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.execute(interaction);
			} catch (error) {
				if (consoleLogErrors == "true") {
					console.error(`Error executing ${interaction.commandName}`);
					console.error(error);
				}
			}
		}
		// if interaction is slashcommand //

		// if interaction is button //
		if (interaction.isButton()) { 
			const btn_id = interaction.customId;
			// open ticket button //
			if (btn_id == 'ticketbtn') {
				// Create the modal
				const modal = new ModalBuilder()
					.setCustomId('ticketModal')
					.setTitle('Start a ticket');
				// Add components to modal
				// Create the text input components
				const subjectInput = new TextInputBuilder()
					.setCustomId('ticketSubject')
					// The label is the prompt the user sees for this input
					.setLabel("Subject:")
					// Short means only a single line of text
					.setStyle(TextInputStyle.Short);
				const ticketTextInput = new TextInputBuilder()
					.setCustomId('ticketText')
					.setLabel("Your message:")
					.setMaxLength(1000)
					// Paragraph means multiple lines of text.
					.setStyle(TextInputStyle.Paragraph);
				// An action row only holds one text input,
				// so you need one action row per text input.
				const firstActionRow = new ActionRowBuilder().addComponents(subjectInput);
				const secondActionRow = new ActionRowBuilder().addComponents(ticketTextInput);
				// Add inputs to the modal
				modal.addComponents(firstActionRow, secondActionRow);
				// Show the modal to the user
				await interaction.showModal(modal);

			}
			// open ticket button //

			// close ticket button //
			if (btn_id == 'closeticket') {
				const closeChannelId = interaction.channelId;
				console.log(closeChannelId);
				const btnRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('closeticketY')
							.setLabel('Yes close it')
							.setStyle(ButtonStyle.Danger)
				).addComponents(
					new ButtonBuilder()
						.setCustomId('closeticketN')
						.setLabel('Cancel')
						.setStyle(ButtonStyle.Secondary)
				);
				await interaction.reply({ content: `<@${interaction.user.id}> Are you sure you want to close the ticket?`, components: [btnRow], ephemeral: false });
			}
			if (btn_id == 'closeticketN') {
				const closeChannelId = interaction.channelId;
				const deleteMessageId = interaction.message.id;
				interaction.message.delete();
				
			}
			if (btn_id == 'closeticketY') {
				interaction.channel.delete();
			}
			// close ticket button //
		}
		// if interaction is button //

		// if interaction is modal //
		if (interaction.isModalSubmit()) {
			const user_id = interaction.user.id;
			const ticketSubject = interaction.fields.getTextInputValue('ticketSubject');
			const ticketText = interaction.fields.getTextInputValue('ticketText');
			if (interaction.customId === 'ticketModal') {
				interaction.guild.channels.create({
					name: "ticket-" + interaction.user.username,
					type: ChannelType.GuildText,
					parent: ticketParent,
					permissionOverwrites: [
						{
							id: interaction.guild.roles.everyone,
							deny: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: clientId,
							allow: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: interaction.user.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
					],
				}).then(channel => {
					const ticketEmbed = new EmbedBuilder()
						.setColor(0x00b646)
						.setTitle(ticketSubject)
						.addFields(
							{ name: '\u200B', value: ticketText },

						);
					const btnRow = new ActionRowBuilder()
						.addComponents(
							new ButtonBuilder()
								.setCustomId('closeticket')
								.setLabel('Close the ticket')
								.setStyle(ButtonStyle.Danger)
								.setEmoji('🔒')
						);
					channel.send({ content: `<@${user_id}> has submitted a ticket:\n`, embeds: [ticketEmbed], components: [btnRow], ephemeral: false }) 
				});
				await interaction.reply({ content: `We've created a ticket and have sent you a ping.`, ephemeral: true });
				//await interaction.deferUpdate(); 
			}
		}
		// if interaction is modal //

	},
};
