import { Colors, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import TCommand from "../../types/TCommand";

export default <TCommand>{
    builder: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Nadaj ostrzeżenie.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption( option => option
            .setName('target')
            .setDescription('Użytkownik')
            .setRequired(true)
        )
        .addStringOption( option => option
            .setName('reason')
            .setDescription('Powód')
        ),
    async execute(client, interaction) {
        const target = interaction.options.getMember('target') as GuildMember | null;
        if (!target) return;
        const reason = interaction.options.getString('reason') ?? 'brak';

        let embed = new EmbedBuilder()
            .setTitle(`${target.user.tag} otrzymał ostrzeżenie.`)
            .setColor(Colors.Yellow)
            .setDescription(`Powód: ${reason}`)
            .setTimestamp();

        
        await interaction.reply({ embeds: [embed] });
    }
}