import { test } from 'vitest';
import { Constants } from '../constants.js';
import { getVersion3Client } from '../utils/index.js';

const client = getVersion3Client();

test.sequential('should create a group', async ({ expect }) => {
  const group = await client.groups.createGroup({
    name: Constants.testGroupName,
  });

  expect(group).toBeTruthy();
  expect(group.name).toBe(Constants.testGroupName);
});

test.sequential('should remove a group', async ({ expect }) => {
  const response = await client.groups.removeGroup({
    groupname: Constants.testGroupName,
  });

  expect(typeof response).toBe('string');
  expect(response.trim()).toBe('');
});
