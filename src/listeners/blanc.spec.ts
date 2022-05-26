import test from 'ava';
import { Message, TextChannel, User } from 'discord.js';
import sinon from 'sinon';

import blanc from './blanc';

test('Replies', (t) => {
    const c = sinon.createStubInstance(TextChannel);
    const u = sinon.createStubInstance(User);
    const m = sinon.createStubInstance(Message);
    sinon.stub(m, 'channel').get(() => c);
    m.author = u;

    u.id = '437953881914474523';
    blanc.handler(m);
    t.is(c.send.callCount, 0);

    u.id = '717414214368755783';
    blanc.handler(m);
    t.is(c.send.callCount, 1);
});
