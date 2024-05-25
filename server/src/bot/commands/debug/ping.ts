import { SlashCommandBuilder } from "discord.js";
import TCommand from "../../types/TCommand";

export default <TCommand>{
    builder: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(client, interaction) {
        await interaction.reply({ content: 'Pong!', ephemeral: true });
    },
}