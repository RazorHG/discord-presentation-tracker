import { SlashCommandBuilder, GuildScheduledEventManager, GuildChannelManager, Interaction, ChatInputCommandInteraction, Snowflake, TextChannel, MessageFlags } from 'discord.js';
import _  from 'lodash';
import { setTimeout } from 'node:timers/promises';

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
	async execute(interaction: ChatInputCommandInteraction) {
		const guild = await interaction.client.guilds.fetch(interaction.guildId as Snowflake);
		const channel = interaction.options.getChannel('channel') as TextChannel;
		const feedback = interaction.options.getString('feedback');

		console.log(interaction.options)
		channel.send(`feedback from ${interaction.member}: ${feedback}`)
		await interaction.reply({ content: `feedback for ${channel}: ${feedback}`, flags: MessageFlags.Ephemeral });
		await setTimeout(5000);
		await interaction.deleteReply();

	},
};