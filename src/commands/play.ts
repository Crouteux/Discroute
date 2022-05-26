import { Command } from '../command';

import { playYoutube, queues } from '../lib/player';
import { readableNumber } from '../lib/util';

import yts, { SearchResult } from 'yt-search';
import { MessageEmbed } from 'discord.js';

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

        let res: SearchResult;
        if (
            args[0].startsWith('https://www.youtube.com/watch?v=') ||
            args[0].startsWith('https://youtu.be/')
        )
            res = await yts({ query: args.join(' ') });
        else res = await yts(args.join(' '));

        const video = res.videos[0];

        const queue = queues.get(message.guild.id);

        const embed = new MessageEmbed()
            .setTitle(video.title)
            .setDescription(
                queue
                    ? `Ajouté à la queue (#${queue.songs.length})`
                    : 'Lecture en cours'
            )
            .setURL(video.url)
            .setImage(video.thumbnail)
            .setAuthor({
                name: video.author.name,
                url: video.author.url,
            })
            .setFooter({
                text: `${readableNumber(video.views)} vues`,
            });

        message.channel.send({
            embeds: [embed],
        });
        playYoutube(video.url, voiceChannel);
    },
};

export default play;
