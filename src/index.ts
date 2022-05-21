import { Client } from 'discord.js';
import { config } from 'dotenv';

config();

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

client.login(process.env.BOT_TOKEN);
