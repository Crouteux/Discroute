import { Handler } from '../listener';

const quoi: Handler<'messageCreate'> = {
    on: 'messageCreate',
    handler: (message) => {
        if (
            !message.author.bot &&
            message.content.toLowerCase().endsWith('quoi')
        )
            message.channel.send('feur');
    },
};

export default quoi;
