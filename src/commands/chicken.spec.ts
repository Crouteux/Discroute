import test from 'ava';
import sinon from 'sinon';

import { Client, Message, TextChannel } from 'discord.js';

import chicken from './chicken';

test('Replies', (t) => {
    const client = sinon.createStubInstance(Client);
    const c = sinon.createStubInstance(TextChannel);
    const m = sinon.createStubInstance(Message);
    sinon.stub(m, 'channel').get(() => c);

    chicken.run(m, [], client);

    t.is(
        c.send.getCall(0).args[0],
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6Al63u1sXu84FBdvLe2iKlw_8PcBQExEcg&usqp=CAU'
    );
});

