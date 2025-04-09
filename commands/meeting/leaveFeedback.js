const { SlashCommandBuilder, GuildScheduledEventManager, GuildChannelManager } = require('discord.js');
const _ = require('lodash');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leavefeedback')
		.setDescription('leave feedback in channel')
		.addChannelOption(option => 
			option
				.setName('channel')
				.setDescription('channel to add feedback too')
				.setRequired(true)
			)
		.addStringOption(option => 
			option
				.setName('feedback')
				.setDescription('feedback for user')
				.setRequired(true)
		),
	async execute(interaction) {
		const guild = await interaction.client.guilds.fetch(interaction.guildId);
		const eventManager = new GuildScheduledEventManager(guild);
		const events = await eventManager.fetch();
		const textChannelMessagedInId = interaction.channelId;
		const voiceChannelMessagedInId = interaction.member.voice.channelId
		const channel = interaction.options.getChannel('channel');
		const feedback = interaction.options.getString('feedback');

		console.log(interaction.options)
		channel.send(`feedback from ${interaction.member}: ${feedback}`)
		await interaction.reply(`feedback for ${channel}: ${feedback}`);

		// console.log(interaction.member.voice.channelId);
		// console.log(events);
	},
};