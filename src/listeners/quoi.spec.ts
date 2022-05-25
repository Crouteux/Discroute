import test from 'ava';
import { Message, TextChannel, User } from 'discord.js';
import sinon from 'sinon';

import quoi from './quoi';

let c: sinon.SinonStubbedInstance<TextChannel>;
let m: sinon.SinonStubbedInstance<Message>;
let u: sinon.SinonStubbedInstance<User>;

test.beforeEach((t) => {
    c = sinon.createStubInstance(TextChannel);
    m = sinon.createStubInstance(Message);
    u = sinon.createStubInstance(User);
    sinon.stub(m, 'channel').get(() => c);
    u.bot = false;
    m.author = u;
});

test.afterEach((t) => {
    sinon.resetHistory();
});

test.serial('Reply count', (t) => {
    m.content = 'quoi';
    const count = 5;
    for (let i = 0; i < count; i++) {
        quoi.handler(m);
    }

    t.is(c.send.callCount, count);
});

test.serial('Replies', (t) => {
    m.content = 'il est quelle heure';
    quoi.handler(m);
    t.is(c.send.callCount, 0);

    m.content = "c'est quoi";
    quoi.handler(m);
    t.is(c.send.getCall(0).args[0], 'feur');

    m.content = 'Quoi';
    quoi.handler(m);
    t.is(c.send.getCall(1).args[0], 'feur');

    m.content = 'Ah ça oui';
    quoi.handler(m);
    t.assert(['stiti', 'fi'].includes(c.send.getCall(2).args[0] as string));
});
