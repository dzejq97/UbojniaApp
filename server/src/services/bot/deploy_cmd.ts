import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env')})
import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
const ClientID = process.env.CLIENT_ID;
const Token = process.env.TOKEN;

const commands: any[] = [];

const commandsPath = path.join(__dirname, 'commands');
const categories = fs.readdirSync(commandsPath);
categories.forEach( category => {
    const filesPath = path.join(commandsPath, category);
    const files = fs.readdirSync(filesPath);
    files.forEach(async (file) => {
        const filePath = path.join(filesPath, file);
        const command = require(filePath).default;
        commands.push(command.builder.toJSON());
    }) 
})


const rest = new REST().setToken(Token!);

(async () => {
    try {
        console.log(`Refreshing ${commands.length} commands`);

        await rest.put(Routes.applicationCommands(ClientID!), { body: []});
        
        await rest.put(
            Routes.applicationCommands(ClientID!),
            {
                body: commands,
            }
        )

        console.log('Success')
    } catch (error) {
        console.log(error);
    }
}) ();