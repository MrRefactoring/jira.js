import { getVersion2Client } from '../utils';
import test from 'ava';

const client = getVersion2Client();

test.serial('should set default user columns', async t => {
  const response = await client.users.setUserColumns();

  t.is(typeof response, 'string');
  t.is(response.trim(), '');
});
