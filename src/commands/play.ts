import { Command } from '../command';

import { playYoutube } from '../lib/player';

import yts from 'yt-search';

export const play: Command = {
    name: 'play',
    description: 'Plays a song',
    run: async (message, args) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.reply(
                'Vous devez être connecté à un salon vocal pour utiliser cette commande'
            );

        if (args.length === 0)
            return message.channel.send('Veuillez entrer une URL');

        let url: string;
        if (
            args[0].startsWith('https://www.youtube.com/watch?v=') ||
            args[0].startsWith('https://youtu.be/')
        )
            url = args[0];
        else {
            const res = await yts(args.join(' '));
            url = res.videos[0].url;
        }

        playYoutube(url, voiceChannel);
    },
};

export default play;
