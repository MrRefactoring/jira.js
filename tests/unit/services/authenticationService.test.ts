import { test } from 'vitest';
import type { Config } from '../../../src/index.js';
import { getAuthenticationToken } from '../../../src/services/authenticationService/index.js';

test('should return undefined when authentication does not used', async ({ expect }) => {
  const authentication = undefined;

  const token = await getAuthenticationToken(authentication);

  expect(token).toBe(undefined);
});

test('should return Basic authentication token for password case', async ({ expect }) => {
  const authentication: Config.Authentication = {
    basic: {
      username: 'test_username',
      password: 'test_password',
    },
  };

  const token = await getAuthenticationToken(authentication);

  expect(token).toBe('Basic dGVzdF91c2VybmFtZTp0ZXN0X3Bhc3N3b3Jk');
});

test('should return Basic authentication token for apiToken case', async ({ expect }) => {
  const authentication: Config.Authentication = {
    basic: {
      email: 'test_email@test.qwe',
      apiToken: 'test_apiToken',
    },
  };

  const token = await getAuthenticationToken(authentication);

  expect(token).toBe('Basic dGVzdF9lbWFpbEB0ZXN0LnF3ZTp0ZXN0X2FwaVRva2Vu');
});

test('should generate Bearer Header correctly for Personal Access Token', async ({ expect }) => {
  const authentication: Config.Authentication = {
    personalAccessToken: 'secretPAT',
  };

  const token = await getAuthenticationToken(authentication);

  expect(token).toBe('Bearer secretPAT');
});
