import {
    createAudioPlayer,
    createAudioResource,
    demuxProbe,
    getVoiceConnection,
    joinVoiceChannel,
    VoiceConnection,
} from '@discordjs/voice';
import { VoiceBasedChannel } from 'discord.js';

import ytdl from 'ytdl-core';

import type { Readable } from 'stream';

/**
 * Looks for a voice connection with the given channel, and creates one if it doesn't exist
 *
 * @param {VoiceBasedChannel} channel
 * @returns {VoiceConnection} The voice connection
 */
export const voiceConnection = (
    channel: VoiceBasedChannel
): VoiceConnection => {
    let connection = getVoiceConnection(channel.guild.id);
    if (!connection) {
        connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }

    return connection;
};

/**
 * Plays a song from a given stream
 *
 * @param {Readable} readable The readable stream of the song
 * @param {VoiceBasedChannel} channel The voice channel to play the file in
 */
export const playStream = async (
    readable: Readable,
    channel: VoiceBasedChannel
) => {
    const { stream, type } = await demuxProbe(readable);
    const resource = createAudioResource(stream, { inputType: type });
    const connection = voiceConnection(channel);
    const player = createAudioPlayer();
    player.play(resource);

    connection.subscribe(player);
};

/**
 * Plays a song from a given YouTube URL
 *
 * @param {string} url The url of the song to play
 * @param {VoiceBasedChannel} channel The voice channel to play the song in
 */
export const playYoutube = (url: string, channel: VoiceBasedChannel) => {
    playStream(
        ytdl(url, {
            quality: 'highestaudio',
            filter: 'audioonly',
        }),
        channel
    );
};
