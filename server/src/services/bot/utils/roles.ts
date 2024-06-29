import { GuildMember, GuildMemberRoleManager, Role } from "discord.js";
import { UClient } from "../client";

export const rolesToIDArray = (roles: GuildMemberRoleManager): string[] => {
    const array: string[] = [];
    for (const role of roles.cache.values()) {
        array.push(role.id);
    }
    return array;
}

export const IDsToRoleArray = async (ids: String[], client: UClient): Promise<Role[]> => {
    const guild = await client.getMainGuild();
    const rolesArray: Role[] = [];

    for (const id of ids) {
        const role = (await guild.roles.fetch()).find(role => role.id === id);
        if (!role) continue;
        else rolesArray.push(role);
    }

    return rolesArray;
}