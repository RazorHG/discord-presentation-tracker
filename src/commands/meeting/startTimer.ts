import { SlashCommandBuilder, GuildScheduledEventManager, GuildChannelManager, Interaction, ChatInputCommandInteraction, Snowflake, TextChannel, MessageFlags } from 'discord.js';
import _  from 'lodash';
import { setTimeout } from 'node:timers/promises';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('starttimer')
		.setDescription('leave feedback in channel')
		.addIntegerOption(option => 
			option
				.setName('duration')
				.setDescription('duration for presentation in minutes (2 through 15)')
				.setRequired(true)
			),
	async execute(interaction: ChatInputCommandInteraction) {
		const duration = interaction.options.getInteger('duration');

		if (duration && duration >=2 && duration <= 15) {
			await interaction.reply({ content: `starting ${duration} minute timer` });
			await setTimeout((duration - 1) * 1000 * 60);
			await interaction.editReply('1 minute left with presentation');
			await setTimeout(58000);
			await interaction.editReply('Times up!');
		} else {
			await interaction.reply({ content: `invalid duration entered. enter a duration between 2 and 15`, flags: MessageFlags.Ephemeral });
			await setTimeout(5000);
			await interaction.deleteReply();
		}
		
	},
};