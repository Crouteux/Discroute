import test from 'ava';
import sinon from 'sinon';

import { Client, Message, TextChannel } from 'discord.js';

import quoi from './quoi';

test('Replies', (t) => {
    const client = sinon.createStubInstance(Client);
    const c = sinon.createStubInstance(TextChannel);
    const m = sinon.createStubInstance(Message);
    sinon.stub(m, 'channel').get(() => c);

    quoi.run(m, [], client);

    t.is(
        c.send.getCall(0).args[0], 'feur'
    );
});

