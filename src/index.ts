import chalk from 'chalk';
import { Client } from 'discord.js';
import { config } from 'dotenv';
import { loadCommands } from './command';

config();

const commands = loadCommands();

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

client.on('ready', () => console.log(chalk.blue('Ready')));

client.on('messageCreate', (message) => {
    if (!message.content.startsWith('!')) return;

    const [command, ...args] = message.content.slice(1).split(' ');
    commands.find((c) => c.name === command)?.run(message, args, client);
});

client.login(process.env.BOT_TOKEN);
