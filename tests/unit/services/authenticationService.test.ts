import { test } from 'vitest';
import type { Config } from '@jirajs';
import { getAuthenticationToken } from '@jirajs/services/authenticationService';

test('should return undefined when authentication does not used', async ({ expect }) => {
  const authentication = undefined;

  const token = await getAuthenticationToken(authentication);

  expect(token).toBe(undefined);
});

test('should return Basic authentication token for apiToken case', async ({ expect }) => {
  const authentication: Config['authentication'] = {
    basic: {
      email: 'test_email@test.qwe',
      apiToken: 'test_apiToken',
    },
  };

  const token = await getAuthenticationToken(authentication);

  expect(token).toBe('Basic dGVzdF9lbWFpbEB0ZXN0LnF3ZTp0ZXN0X2FwaVRva2Vu');
});
