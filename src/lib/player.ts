import {
    AudioPlayer,
    AudioPlayerStatus,
    AudioResource,
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

class Queue {
    public readonly player: AudioPlayer;
    public readonly songs: AudioResource[];

    constructor(
        current: AudioResource,
        public readonly channel: VoiceBasedChannel
    ) {
        this.songs = [current];

        this.player = createAudioPlayer();
        this.player.play(current);
        this.player.on(AudioPlayerStatus.Idle, () => this.skip());
        voiceConnection(channel).subscribe(this.player);
    }

    public add(song: AudioResource) {
        this.songs.push(song);
    }

    public async skip() {
        this.songs.shift();
        if (this.songs.length) {
            this.player.play(this.songs[0]);
        } else {
            this.player.stop();
            queues.delete(this.channel.guild.id);
        }
    }
}

export const queues: Map<string, Queue> = new Map();

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

export const createStreamResource = async (
    readable: Readable
): Promise<AudioResource> => {
    const { stream, type } = await demuxProbe(readable);
    return createAudioResource(stream, { inputType: type });
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
    const resource = await createStreamResource(readable);
    let queue = queues.get(channel.guild.id);
    if (queue) {
        queue.add(resource);
    } else {
        queue = new Queue(resource, channel);
        queues.set(channel.guild.id, queue);
    }
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
