import { ChannelType, Client, Collection, Events, GatewayIntentBits, Guild, OverwriteResolvable, Role, TextChannel } from "discord.js";
import path from 'path';
import fs from 'fs';
import TEvent from "./types/TEvent";
import TCommand from "./types/TCommand";
import config from "../../config";

export class UClient extends Client {
    config = config;
    commands: Collection<string, TCommand> = new Collection();
    driven_roles: Collection<string, Role> = new Collection();
    driven_channels: Collection<string, TextChannel> = new Collection();

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping
            ]
        });

        this.loadEvents();
        this.loadCommands();
    }

    async getMainGuild(): Promise<Guild> {
        const guild = await this.guilds.fetch(process.env.GUILD_ID!);
        return guild ? guild : process.exit();
    }

    async fetchOrSetupDrivenRoles(): Promise<void> {
        try {
            const guild = await this.getMainGuild();
            for (const driven_role of this.config.bot.botDrivenRoles) {
                let role = (await guild.roles.fetch()).find( role => role.name === driven_role.name);
    
                if (!role) {
                    role = await guild.roles.create({
                        name: driven_role.name,
                        color: driven_role.color,
                        permissions: driven_role.permissions,
                    });
                }
    
                this.driven_roles.set(driven_role.ref, role);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async fetchOrSetupDrivenChannels(): Promise<void> {
        try {
            const guild = await this.getMainGuild();
            for (const driven_channel of this.config.bot.botDrivenChannels) {
                let channel = (await guild.channels.fetch()).find( channel => channel?.name === driven_channel.name);
    
                if (!channel || channel.type !== ChannelType.GuildText) {
                    await channel?.delete();
    
                    const parsedOverwrites: OverwriteResolvable[] = [];
    
                    for (const overwrite of driven_channel.permissionsOverwrites) {
                        parsedOverwrites.push({
                            id: this.driven_roles.get(overwrite.role_ref)!.id,
                            allow: overwrite.allow,
                            deny: overwrite.deny
                        })
                    }
    
                    channel = await guild.channels.create({
                        type: ChannelType.GuildText,
                        name: driven_channel.name,
                        permissionOverwrites: parsedOverwrites
                    })
                }
                this.driven_channels.set(driven_channel.ref, channel);
            }
        } catch (error) {
            console.log(error);
        }
    }

    private loadEvents() {
        const eventsPath = path.join(__dirname, 'events');
        const eventsFiles = fs.readdirSync(eventsPath);
        eventsFiles.forEach((file) => {
            const filePath = path.join(eventsPath, file);
            import(filePath).then( (e) => {
                const event: TEvent = e.default;
                if (event.once) this.once(event.name, async (...args) => await event.execute(this, ...args));
                else if (!event.once) this.on(event.name, async (...args) => await event.execute(this, ...args));
            })
        })

        console.log('✅:Events loaded');
    }

    private loadCommands() {
        const commandsPath = path.join(__dirname, 'commands');
        const categories = fs.readdirSync(commandsPath);
        categories.forEach( category => {
            const filesPath = path.join(commandsPath, category);
            const files = fs.readdirSync(filesPath);
            files.forEach(file => {
                const filePath = path.join(filesPath, file);
                import(filePath).then( c => {
                    const command: TCommand = c.default;
                    this.commands.set(command.builder.name, command);
                })
            }) 
        })

        console.log('✅:Commands loaded')
    }
};

const client = new UClient();

export { client };