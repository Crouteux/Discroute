import { Client } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Command } from './command';

config();

const commands = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter((f) => f.endsWith('.js'))
    .map((f) => require(`./commands/${f}`).default as Command);

commands.forEach((c) => console.log(`Loaded command: ${c.name}`));

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_TYPING',
    ],
    presence: {
        activities: [
            {
                name: 'feur',
                type: 'LISTENING',
            },
        ],
        status: 'dnd',
    },
});

client.on('ready', () => console.log('Ready!'));

client.on('messageCreate', (message) => {
    if (!message.content.startsWith('!')) return;

    const [command, ...args] = message.content.slice(1).split(' ');
    commands.find((c) => c.name === command)?.run(message, args, client);
});

client.login(process.env.BOT_TOKEN);
