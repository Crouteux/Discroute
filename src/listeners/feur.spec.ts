import test from 'ava';
import sinon from 'sinon';

import { Message, TextChannel, User } from 'discord.js';

import feur from './feur';

let c: sinon.SinonStubbedInstance<TextChannel>;
let m: sinon.SinonStubbedInstance<Message>;
let u: sinon.SinonStubbedInstance<User>;

test.beforeEach((t) => {
    c = sinon.createStubInstance(TextChannel);
    m = sinon.createStubInstance(Message);
    u = sinon.createStubInstance(User);
    sinon.stub(m, 'channel').get(() => c);
    m.author = u;
});

test.afterEach.always((t) => {
    sinon.resetHistory();
});

test.serial('Replies', (t) => {
    m.content = 'i was fourteen when i met her';

    feur.handler(m);

    t.is(c.send.getCall(0).args[0], 'feurteen');
});

test.serial('Answer count', (t) => {
    m.content = 'for what';

    const count = 5;
    for (let i = 0; i < 5; i++) {
        feur.handler(m);
    }

    t.is(c.send.callCount, count);
});
