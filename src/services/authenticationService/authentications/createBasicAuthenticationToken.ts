import { ClientConfig } from '../../../clientConfig';

export function createBasicAuthenticationToken(authenticationData: ClientConfig.Authentication.Basic) {
  const {
    username,
    password,
    apiToken,
  } = authenticationData;

  const buffer = Buffer.from(`${username}:${apiToken ?? password}`);
  const token = buffer.toString('base64');

  return `Basic ${token}`;
}
