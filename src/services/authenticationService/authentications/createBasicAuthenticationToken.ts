import { Config } from '../../../config';

export function createBasicAuthenticationToken(authenticationData: Config.Authentication.Basic) {
  let login;
  let secret;

  if ('username' in authenticationData) {
    login = authenticationData.username;
    secret = authenticationData.password;
  } else {
    login = authenticationData.email;
    secret = authenticationData.apiKey;
  }

  const buffer = Buffer.from(`${login}:${secret}`);
  const token = buffer.toString('base64');

  return `Basic ${token}`;
}
