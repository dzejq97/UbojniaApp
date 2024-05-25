import { ColorResolvable, OverwriteResolvable, PermissionOverwrites, PermissionResolvable } from "discord.js";

export default interface IConfig {
    dev: boolean;
    bot: IBotConfig;
    server?: IServerConfig;
}

export interface IBotConfig {
    guildID: string,
    botDrivenRoles: IBotDrivenRole[];
    botDrivenChannels: IBotDrivenChannels[];
}

export interface IServerConfig {
    
}

//

export interface IBotDrivenRole {
    name: string,
    ref: string,
    position?: number,
    color: ColorResolvable,
    permissions: PermissionResolvable[]
}

export interface IBotDrivenChannels {
    name: string,
    ref: string,
    permissionsOverwrites: IPermissionOverwrites[]
}

export interface IPermissionOverwrites {
    role_ref: string,
    allow?: PermissionResolvable[],
    deny?: PermissionResolvable[]
}