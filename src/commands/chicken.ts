import { Command } from '../command';

const chicken: Command = {
    name: 'chicken',
    description: 'funy sandwich',
    run: (message) => {
        message.channel.send("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6Al63u1sXu84FBdvLe2iKlw_8PcBQExEcg&usqp=CAU")
        message.channel.send('funy sandwich');
    },
};

export default chicken;
