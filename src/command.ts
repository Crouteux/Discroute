import chalk from 'chalk';
import type { Client, Message } from 'discord.js';

import fs from 'fs';
import path from 'path';

export type CommandExecutor = (
    message: Message,
    args: string[],
    client: Client
) => any;

export type Command = {
    name: string;
    description: string;
    run: CommandExecutor;
};

export const loadCommands = () =>
    fs
        .readdirSync(path.join(__dirname, 'commands'))
        .filter((f) => f.endsWith('.js'))
        .map((f) => {
            const cmd = require(`./commands/${f}`).default as Command;
            console.log(chalk.green('CMD ') + cmd.name);
            return cmd;
        });
