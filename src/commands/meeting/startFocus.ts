import { SlashCommandBuilder, GuildScheduledEventManager, GuildChannelManager, Interaction, Snowflake, ChatInputCommandInteraction, GuildMember, User, Collection } from 'discord.js';
import _  from 'lodash';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('focusgroupstart')
		.setDescription('Starts meeting for focus group'),
	async execute(interaction: ChatInputCommandInteraction) {
		const guild = await interaction.client.guilds.fetch(interaction.guildId as Snowflake);
		guild.channels
		const interactionOwner = interaction.member as GuildMember
		if (interactionOwner.voice.channelId) {
			const channelUserIsIn = await guild.channels.fetch(interactionOwner.voice.channelId);
			const attendees: GuildMember[] = [];
			console.log(channelUserIsIn?.members);
			if (channelUserIsIn?.members) {
				(channelUserIsIn.members as Collection<string, GuildMember>).each((member) => {
					attendees.push(member);
				})
				const attendeesOrder = _.shuffle(attendees).reduce((text, attendee) => {
					return `${text}\n${attendee.user.globalName}`;
				}, '')
				const replyMessage = `Starting Focus Group Meeting\nFocus Group Meeting Order:${attendeesOrder}`
				await interaction.reply(replyMessage);

			}
			else {
				await interaction.reply({ content: 'Join a voice channel to start the meeting', ephemeral: true });
			}
		}
		
		// console.log(interaction.member.voice.channelId);
		// console.log(events);
	},
};