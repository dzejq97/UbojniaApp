import { Events, Message } from "discord.js";
import TEvent from "../types/TEvent";

import { client as c } from "../client";

export default <TEvent>{
    name: Events.MessageCreate,
    once: false,
    async execute(client, message: Message) {

    }
}