import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { UClient } from "../client"

type TCommand = {
    builder: SlashCommandBuilder,
    execute(client: UClient, interaction: ChatInputCommandInteraction): Promise<void>
}

export default TCommand;