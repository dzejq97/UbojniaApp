import { Colors, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import TCommand from "../../types/TCommand";

const protected_permissions = [
    PermissionFlagsBits.Administrator, PermissionFlagsBits.BanMembers,
    PermissionFlagsBits.KickMembers, PermissionFlagsBits.MuteMembers
    ]

export default <TCommand>{
    builder: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Wyrzuć użytkownika')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption( option => option
            .setName('target')
            .setDescription('Użytkownik')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Powód')
        ),
    async execute(client, interaction) {
        const target = interaction.options.getMember('target') as GuildMember | null;
        if (!target) return;
        const reason = interaction.options.getString('reason') ?? 'brak';

        if (target.id === interaction.member?.user.id) {
            await interaction.reply({ content: 'Nie można wyrzucić samego siebie', ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${target.user.tag} został wyrzucony.`)
            .setDescription(`Powód: ${reason}`)
            .setColor(Colors.Orange)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
        //await target.kick(reason);
    }
}