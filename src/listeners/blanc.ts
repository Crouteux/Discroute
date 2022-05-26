import { Handler } from '../listener';

const blnc = '** **';
const blanc: Handler<'messageCreate'> = {
    on: 'messageCreate',
    handler: (message) => {
        if (message.author.id == '717414214368755783')
            message.channel.send(blnc);
    },
};

export default blanc;
