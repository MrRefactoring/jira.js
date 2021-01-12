import * as jwt from 'atlassian-jwt';
import { ClientConfig } from '../../../clientConfig';

export function createJWTAuthentication(
  authenticationData: ClientConfig.Authentication.JWT,
  requestData: {
    method: string;
    url: string;
  },
) {
  const {
    method,
    url,
  } = requestData;

  const now = Math.floor(Date.now() / 1000);
  const expire = now + 180;

  const request = jwt.fromMethodAndUrl(method, url);
  const tokenData = {
    iss: authenticationData.issuer,
    qsh: jwt.createQueryStringHash(request),
    iat: now,
    exp: expire,
  };

  const token = jwt.encode(tokenData, authenticationData.secret);

  return `JWT ${token}`;
}
