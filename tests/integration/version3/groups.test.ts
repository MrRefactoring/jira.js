import test from 'ava';
import { Constants } from '..';
import { getVersion3Client } from '../utils';

const client = getVersion3Client();

test.serial('should create a group', async t => {
  const group = await client.groups.createGroup({
    name: Constants.testGroupName,
  });

  t.truthy(group);
  t.is(group.name, Constants.testGroupName);
});

test.serial('should remove a group', async t => {
  const response = await client.groups.removeGroup({
    groupname: Constants.testGroupName,
  });

  t.is(typeof response, 'string');
  t.is(response.trim(), '');
});
