const { Events, WebhookClient, EmbedBuilder } = require('discord.js');
const { consoleLogErrors, guildId, githubChannel, githubWebhookId, githubWebhookToken } = require('../config.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.webhookId && message.webhookId == githubWebhookId) {
			const getEmbed = await message.fetch();
			const gitWebhook = new WebhookClient({ id: githubWebhookId, token: githubWebhookToken });
			const channel = message.client.guilds.cache.get(guildId).channels.cache.get(githubChannel);

			getEmbed.embeds.forEach((embed) => {
				global.embedTitle = embed.title;
				global.embedURL = embed.url;
			});
			const messageId = message.id;
			const embed = new EmbedBuilder()
				.setTitle(global.embedTitle)
				.setURL(global.embedURL)
				.setAuthor({ name: 'Codump', iconURL: 'https://avatars.githubusercontent.com/u/108196527?s=400&u=33ae959c9aa6fa30d4110203baf3cd135c060629&v=4', url: 'https://github.com/codump' })
				.setColor(0x00b646);

			try {
				await gitWebhook.editMessage(messageId, {
					content: '<@&role-id>',
					embeds: [embed],
				});
			} catch (error) {
				if (consoleLogErrors == "true") {
					console.error(error);
				}
			}
		}
	},
};
