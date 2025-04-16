import fs from 'fs';
import path from 'node:path';
import { ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lists all available commands'),
    async execute(interaction: ChatInputCommandInteraction) {
        let str = 'List of commands for focusgroupbot: \n';
        const foldersPath = path.normalize(__dirname + '/..');
        console.log(foldersPath);
        const commandFolders = fs.readdirSync(foldersPath);
        console.log(commandFolders);
        for (const folder of commandFolders) {
                const commandsPath = path.join(foldersPath, folder);
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                str += `${command.data.name}        ${command.data.description} \n`;
                }
        }

        
        return interaction.reply({
        content: str,
        ephemeral: true,
        });
    },
};