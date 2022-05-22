import type { Client, Message } from 'discord.js';

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
