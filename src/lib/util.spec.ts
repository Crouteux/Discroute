import test from 'ava';

import { readableNumber } from './util';

test('Readable numbers', (t) => {
    t.is(readableNumber(0), '0');
    t.is(readableNumber(1000), '1 000');
    t.is(readableNumber(1000000), '1 000 000');
    t.is(readableNumber(-5000), '-5 000');
    t.is(readableNumber(-100000), '-100 000');
});
