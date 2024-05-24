import { Base64Encoder } from '../base64Encoder.js';
import type { Config } from '../../../config.js';

export function createBasicAuthenticationToken(authenticationData: Config.Authentication.Basic) {
  let login;
  let secret;

  if ('username' in authenticationData) {
    login = authenticationData.username;
    secret = authenticationData.password;
  } else {
    login = authenticationData.email;
    secret = authenticationData.apiToken;
  }

  const token = Base64Encoder.encode(`${login}:${secret}`);

  return `Basic ${token}`;
}
