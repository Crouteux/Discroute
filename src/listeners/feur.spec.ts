import test from 'ava';
import sinon from 'sinon';

import { Client, Message, TextChannel } from 'discord.js';

import feur from './feur';

test('Replies', (t) => {
    const c = sinon.createStubInstance(TextChannel);
    const m = sinon.createStubInstance(Message);
    sinon.stub(m, 'channel').get(() => c);
    m.content = "i was fourteen when i met her"

    feur.handler(m);

    t.is(
        c.send.getCall(0).args[0], 'feurteen'
    );
});

