import { Command } from '../command';

import { playYoutube } from '../lib/player';

export const play: Command = {
    name: 'play',
    description: 'Plays a song',
    run: async (message, args) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.reply(
                'Vous devez être connecté à un salon vocal pour utiliser cette commande'
            );

        const url = args[0];
        if (!url) return message.channel.send("L'URL n'est pas valide");

        playYoutube(url, voiceChannel);
    },
};

export default play;
