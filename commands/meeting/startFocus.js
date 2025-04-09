const { SlashCommandBuilder, GuildScheduledEventManager, GuildChannelManager } = require('discord.js');
const _ = require('lodash');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('focusgroupstart')
		.setDescription('Starts meeting for focus group'),
	async execute(interaction) {
		const guild = await interaction.client.guilds.fetch(interaction.guildId);
		const eventManager = new GuildScheduledEventManager(guild);
		const channelManager = new GuildChannelManager(guild);
		const events = await eventManager.fetch();
		const textChannelMessagedInId = interaction.channelId;
		const voiceChannelMessagedInId = interaction.member.voice.channelId
		const channelUserIsIn = await channelManager.fetch(voiceChannelMessagedInId);
		const attendees = [];
		if (channelUserIsIn) {
			channelUserIsIn.members.forEach(member => {
				attendees.push(member.user)
			});
			const attendeesOrder = _.shuffle(attendees).reduce((text, attendee) => {
				return `${text}\n${attendee.globalName}`;
			}, '')
			const replyMessage = `Starting Focus Group Meeting\nFocus Group Meeting Order:${attendeesOrder}`
			await interaction.reply(replyMessage);

		}
		else {
			await interaction.reply({ content: 'Join a voice channel to start the meeting', ephemeral: true });
		}
		// console.log(interaction.member.voice.channelId);
		// console.log(events);
	},
};