import test from 'ava';
import sinon from 'sinon';

import { Client, Message, TextChannel } from 'discord.js';

import ping from './ping';

test('Replies', (t) => {
    // Stub Discord client class
    const client = sinon.createStubInstance(Client);
    // Stub message text channel
    const c = sinon.createStubInstance(TextChannel);
    // Stub message
    const m = sinon.createStubInstance(Message);
    sinon.stub(m, 'channel').get(() => c);

    // Run ping command with the stubs
    ping.run(m, [], client);

    // Make sure c.send was called with the right message
    t.is(c.send.getCall(0).args[0], 'Pong!');
});
