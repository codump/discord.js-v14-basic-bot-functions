const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, GatewayIntentBits } = require('discord.js');
const { token, guildId, consoleLogErrors, ticketChannel } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
	console.log('Bot is connected...');

	try {
		const channel = await client.guilds.cache.get(guildId).channels.cache.get(ticketChannel);
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('ticketbtn')
					.setLabel('Start a ticket')
					.setStyle(ButtonStyle.Success)
					.setEmoji('🎫')
			);

		if (!channel || channel.type !== 'text')
			channel.send({ content: `**Want to use a ticket system?**\nHere you have it, when pressed on the button a ticket will be created. The member that has created the ticket will get a ping so they can find the ticket easily.`, components: [row] });
	} catch (error) {
		if (consoleLogErrors == "true") {
			console.log(error);
		}
	}
});

client.login(token);
