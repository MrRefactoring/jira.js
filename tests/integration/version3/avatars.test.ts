import { getVersion3Client } from '../utils';
import test from 'ava';

const client = getVersion3Client();

test.serial('should get all avatars', async t => {
  const r = await client.avatars.getAllSystemAvatars({ type: 'project' });

  t.pass();
});
