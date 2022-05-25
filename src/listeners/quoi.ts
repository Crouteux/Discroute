import { Handler } from '../listener';

const answers = {
    quoi: ['feur'],
    qui: ['wi', 'gnon'],
    oui: ['stiti', 'fi'],
    sa: ['lade', 'pristi'],
    moi: ['ssoneur', 'ssoneuse'],
    bien: ['deux'],
};

const quoi: Handler<'messageCreate'> = {
    on: 'messageCreate',
    handler: (message) => {
        if (message.author.bot) return;

        Object.keys(answers).forEach((end) => {
            if (
                message.content
                    .toLowerCase()
                    .replace(/[^a-zA-Z]+/g, '')
                    .endsWith(end)
            ) {
                const answer = answers[end];
                message.channel.send(
                    answer[Math.floor(Math.random() * answer.length)]
                );
            }
        });
    },
};

export default quoi;
