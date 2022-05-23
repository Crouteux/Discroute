import test from 'ava';
import sinon from 'sinon';

import { Client, Message, TextChannel } from 'discord.js';

import uwu from './uwu';

test('UwUifies', (t) => {
    const client = sinon.createStubInstance(Client);
    const c = sinon.createStubInstance(TextChannel);
    const m = sinon.createStubInstance(Message);
    sinon.stub(m, 'channel').get(() => c);

    uwu.run(m, 'dream is the best youtuber ever'.split(' '), client);
    uwu.run(
        m,
        'i am writing random things this is a test case'.split(' '),
        client
    );

    t.is(c.send.getCall(0).args[0], 'dweam is teh best youtubew evew');
    t.is(
        c.send.getCall(1).args[0],
        'i am wwiting wandom things dis is a test case'
    );
});
