import { encode } from '../base64Encoder';
import type { BasicAuth } from '../../../config';

export function createBasicAuthenticationToken(authenticationData: BasicAuth) {
  const login = authenticationData.email;
  const secret = authenticationData.apiToken;

  const token = encode(`${login}:${secret}`);

  return `Basic ${token}`;
}
