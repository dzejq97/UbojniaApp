import { PermissionFlagsBits as P } from "discord.js";
import IConfig from "./interfaces/IConfig";

export default <IConfig>{
    dev: true,
    bot: {
        guildID: '1235213920864567376',
        botDrivenRoles: [
            {
                name: '👑 Owner',
                ref: 'owner',
                color: '#ffff0f',
                permissions: [ P.Administrator ]
            },
            {
                name: '🛡️ Moderator',
                ref: 'moderator',
                color: '#ff00ff',
                permissions: [
                    P.BanMembers, P.KickMembers, P.MuteMembers, P.CreateEvents, P.DeafenMembers,
                    P.ManageMessages, P.ManageThreads, P.MoveMembers, P.MentionEveryone
                ]
            },
            {
                name: '✅',
                ref: 'verified',
                color: '#09bd87',
                permissions: [
                    P.AddReactions, P.SendMessages, P.AttachFiles, P.ReadMessageHistory,
                    P.Stream, P.UseExternalEmojis, P.Connect, P.Speak, P.ChangeNickname,
                    P.ViewChannel, P.UseApplicationCommands, P.UseExternalStickers,
                    P.UseSoundboard, P.SendVoiceMessages,
                ]
            }
        ],
        botDrivenChannels: [
            {
                name: '📙regulamin',
                ref: 'rules',
                permissionsOverwrites: [
                    {
                        role_ref: 'verified',
                        deny: [ P.SendMessages, P.AddReactions],
                        allow: [P.ReadMessageHistory, P.ViewChannel]
                    }
                ]
            },
            {
                name: '✅weryfikacja',
                ref: 'verification',
                permissionsOverwrites: [
                    {
                        role_ref: 'verified',
                        deny: [P.ViewChannel]
                    }
                ]
            }
        ]
    }
}