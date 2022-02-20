import { getVersion3Client } from '../utils';
import test from 'ava';

const client = getVersion3Client();

test.serial('should set default user columns', async (t) => {
  const response = await client.users.setUserColumns();

  t.is(typeof response, 'string');
  t.is(response.trim(), '');
});
