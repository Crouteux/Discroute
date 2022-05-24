import { Command } from '../command';

const quoi: Command = {
    name: "quoi",
    description: 'feur',
    run: (message) => {
        message.channel.send('feur');
    },
};

export default quoi;
