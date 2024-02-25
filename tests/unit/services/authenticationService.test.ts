import test from 'ava';
import { Config } from '../../../src';
import { getAuthenticationToken } from '../../../src/services/authenticationService';

test('should return undefined when authentication does not used', async t => {
  const authentication = undefined;

  const token = await getAuthenticationToken(authentication);

  t.is(token, undefined);
});

test('should return Basic authentication token for password case', async t => {
  const authentication: Config.Authentication = {
    basic: {
      username: 'test_username',
      password: 'test_password',
    },
  };

  const token = await getAuthenticationToken(authentication);

  t.is(token, 'Basic dGVzdF91c2VybmFtZTp0ZXN0X3Bhc3N3b3Jk');
});

test('should return Basic authentication token for apiToken case', async t => {
  const authentication: Config.Authentication = {
    basic: {
      email: 'test_email@test.qwe',
      apiToken: 'test_apiToken',
    },
  };

  const token = await getAuthenticationToken(authentication);

  t.is(token, 'Basic dGVzdF9lbWFpbEB0ZXN0LnF3ZTp0ZXN0X2FwaVRva2Vu');
});

test('should generate Bearer Header correctly for Personal Access Token', async t => {
  const authentication: Config.Authentication = {
    personalAccessToken: 'secretPAT',
  };

  const token = await getAuthenticationToken(authentication);

  t.is(token, 'Bearer secretPAT');
});
