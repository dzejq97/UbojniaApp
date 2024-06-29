import { Events, Interaction } from "discord.js";
import TEvent from "../types/TEvent";

export default <TEvent>{
    name: Events.InteractionCreate,
    once: false,
    async execute(client, interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return console.log(`No command match ${interaction.commandName}`);

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Internal server error', ephemeral: true });
            return;
        }

    },
}