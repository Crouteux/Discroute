import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

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
 * Plays a song from a given file path
 *
 * @param {string} file The path to the file
 * @param {VoiceBasedChannel} channel The voice channel to play the file in
 */
export const playFile = async (file: string, channel: VoiceBasedChannel) => {
    const { stream, type } = await demuxProbe(createReadStream(file));
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
    const dir = path.join(process.cwd(), 'audio', channel.guild.id);

    ytdl(url, {
        quality: 'highestaudio',
        filter: 'audioonly',
    })
        .pipe(createWriteStream(dir))
        .on('finish', async () => {
            await playFile(dir, channel);
        });
};
