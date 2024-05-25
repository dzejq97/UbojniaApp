import { ClientEvents } from "discord.js";
import { UClient } from "../client";

type TEvent = {
    name: keyof ClientEvents,
    once: boolean,
    execute(client: UClient, ...args: any[]): Promise<void>;
}

export default TEvent;