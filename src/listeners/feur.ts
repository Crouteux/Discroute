import { Handler } from '../listener';

const reg = /f[aeiou]*r/g;
const feur: Handler<'messageCreate'> = {
    on: 'messageCreate',
    handler: (message) => {
        if (message.author.bot) return;

        const feur = message.content
            .toLowerCase()
            .split(' ')
            .find((word) => reg.test(word) && !word.includes('feur'))
            ?.replace(reg, 'feur');

        if (feur) message.channel.send(feur);
    },
};

export default feur;
