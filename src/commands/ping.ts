import { Command } from '../command';

const ping: Command = {
    name: 'ping',
    description: 'Pong!',
    run: (message) => {
        message.channel.send('Pong!');
    },
};

export default ping;
