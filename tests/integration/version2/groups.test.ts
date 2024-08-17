import { test } from 'vitest';
import { Constants } from '@tests';
import { getVersion2Client } from '@tests/utils';

const client = getVersion2Client();

test.sequential('should create a group', async ({ expect }) => {
  const group = await client.groups.createGroup({
    name: Constants.testGroupName,
  });

  expect(!!group).toBeTruthy();
  expect(group.name).toBe(Constants.testGroupName);
});

test.sequential('should remove a group', async ({ expect }) => {
  const response = await client.groups.removeGroup({
    groupname: Constants.testGroupName,
  });

  expect(typeof response).toBe('string');
  expect(response.trim()).toBe('');
});
