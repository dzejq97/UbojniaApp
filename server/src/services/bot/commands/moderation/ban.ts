import { Colors, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import TCommand from "../../types/TCommand";

export default <TCommand>{
    builder: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Zbanuj użytkownika.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option
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

        if (target.id === interaction.member?.user.id) 
            return await interaction.reply({ content: 'Nie możesz zbanować samego siebie.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle(`${target.user.tag} został zbanowany.`)
            .setDescription(`Powód: ${reason}`)
            .setColor(Colors.DarkRed)
            .setTimestamp();

        await interaction.reply({ embeds: [embed]} );
        //await target.ban({ reason: reason });
    },
}