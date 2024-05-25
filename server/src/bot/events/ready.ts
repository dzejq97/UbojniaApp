import { Events, embedLength } from "discord.js"
import TEvent from "../types/TEvent"
import { client as c } from "../client"
import { createMember, getMember, memberExists } from "../../database/models/discord/member";

export default <TEvent>{
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        const guild = await client.getMainGuild();
        await guild.roles.everyone.setPermissions([], 'Reset @everyone permissions');

        await client.fetchOrSetupDrivenRoles();
        await client.fetchOrSetupDrivenChannels();

        (await guild.members.fetch()).forEach(async (member) => {
            if (!member.user.bot) {
                if (!await memberExists(member)) {
                    await createMember(member);
                } else {
                    const member_doc = await getMember(member);
                    if (member_doc?.roles.length)
                        await member.roles.set(member_doc?.roles as string[]);
                }
            }
        });

        console.log(`✅:Bot logged in as ${client.user?.tag}`);
    }
}