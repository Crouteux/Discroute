import chalk from 'chalk';
import type { Awaitable, ClientEvents } from 'discord.js';

import fs from 'fs';
import path from 'path';

export type Handler<K extends keyof ClientEvents> = {
    on: K;
    handler: (...args: ClientEvents[K]) => Awaitable<void>;
};

export const loadListeners = () =>
    fs
        .readdirSync(path.join(__dirname, 'listeners'))
        .filter(
            (f) =>
                (!f.endsWith('.spec.ts') && f.endsWith('.ts')) ||
                f.endsWith('.js')
        )
        .map((f) => {
            const l = require(`./listeners/${f}`).default as Handler<
                keyof ClientEvents
            >;
            console.log(chalk.green('LISTENER ') + f.split('.')[0]);
            return l;
        });
