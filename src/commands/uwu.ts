import { Command } from '../command';

const ping: Command = {
    name: 'uwu',
    description: 'uwuify',
    run: (message, args) => {
        if (args.length === 0) return;

        const uwu = args
            .join(' ')
            .replaceAll(/r|l/g, 'w')
            .replaceAll('this', 'dis')
            .replaceAll('th ', 'f ')
            .replaceAll('the', 'teh')
            .replaceAll('hand', 'paw')
            .replaceAll('?', ' OwO?');
        message.channel.send(uwu);
    },
};

export default ping;
