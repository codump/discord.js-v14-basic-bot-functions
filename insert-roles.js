const { Client, GatewayIntentBits } = require('discord.js');
const { token, guildId, rolesChannel } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });

client.once('ready', async () => {
	console.log('Bot is connected...');

	try {
		const channel = await client.guilds.cache.get(guildId).channels.cache.get(rolesChannel);

		if (!channel || channel.type !== 'text') {
			const roleMessage = await channel.send({ content: `**React with the respective emoji under this message to choose a role and the functions that come with it.**\n\n:rocket: <@&1042438826464923708> with this role you get a ping when Codump has a new release on GitHub.\n\n:reminder_ribbon: <@&1043168042592510003> with this role you get access to the dump your code category.\n\n👇` });
			roleMessage.react('🚀');
			roleMessage.react('🎗');
			console.log('Role selection inserted');
		}
	} catch (error) {
		console.log(error);
	}
});

client.login(token);
