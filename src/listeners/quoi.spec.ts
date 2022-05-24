import test from 'ava';
import { Message, TextChannel, User } from 'discord.js';
import sinon from 'sinon';

import quoi from './quoi';

test('Replies', (t) => {
    const c = sinon.createStubInstance(TextChannel);
    const m = sinon.createStubInstance(Message);
    const u = sinon.createStubInstance(User);
    sinon.stub(m, 'channel').get(() => c);
    u.bot = false;
    m.author = u;

    m.content = 'il est quelle heure';
    quoi.handler(m);
    t.is(c.send.callCount, 0);

    m.content = "c'est quoi";
    quoi.handler(m);
    t.is(c.send.callCount, 1);

    m.content = 'Quoi';
    quoi.handler(m);
    t.is(c.send.callCount, 2);
});
