import test from 'ava';
import { getVersion2Client } from '../utils';

const client = getVersion2Client();

test.serial('should set default user columns', async t => {
  const response = await client.users.setUserColumns();

  t.is(typeof response, 'string');
  t.is(response.trim(), '');
});
