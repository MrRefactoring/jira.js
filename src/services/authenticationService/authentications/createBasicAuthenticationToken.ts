import { Base64Encoder } from '../base64Encoder';
import { BasicAuth } from '../../../config';

export function createBasicAuthenticationToken(authenticationData: BasicAuth) {
  const login = authenticationData.email;
  const secret = authenticationData.apiToken;

  const token = Base64Encoder.encode(`${login}:${secret}`);

  return `Basic ${token}`;
}
