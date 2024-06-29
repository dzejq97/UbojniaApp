import { Events, GuildMember } from "discord.js";
import TEvent from "../types/TEvent";
import Members, { createMember, getMember, memberExists } from "../../../database/models/discord/member";
import { IDsToRoleArray, rolesToIDArray } from "../utils/roles";

export default <TEvent>{
    name: Events.GuildMemberAdd,
    once: false,
    async execute(client, member: GuildMember) {
        if (!await memberExists(member)) {
            await createMember(member);
        } else {
            const member_doc = await getMember(member);
            if (member_doc?.roles.length) {
                await member.roles.set(member_doc.roles as string[]);
            }
        }
    }
}