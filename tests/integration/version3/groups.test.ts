import { Constants } from '..';
import { getVersion3Client } from '../utils';
import test from 'ava';

const client = getVersion3Client();

test.serial.skip('should create a group', async t => { // todo some jira problems
  const group = await client.groups.createGroup({
    name: Constants.testGroupName,
  });

  t.truthy(group);
  t.is(group.name, Constants.testGroupName);
});

test.serial.skip('should remove a group', async t => { // todo some jira problems
  const response = await client.groups.removeGroup({
    groupname: Constants.testGroupName,
  });

  t.is(typeof response, 'string');
  t.is(response.trim(), '');
});
