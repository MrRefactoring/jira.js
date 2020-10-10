import * as jwt from 'atlassian-jwt';
import * as url from 'url';
import { ClientConfig } from '../clientConfig';

export const getAuthentication = (config: ClientConfig, request: ClientConfig.RequestConfig): string | undefined => {
  if (config.authentication?.jwt) {
    const { iss, secret, expiryTimeSeconds = 180 } = config.authentication.jwt;
    const pathname = url.parse(request.url || '').pathname || '';
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const jwtToken = jwt.encode(
      {
        iss,
        iat: nowInSeconds,
        exp: nowInSeconds + expiryTimeSeconds,
        qsh: jwt.createQueryStringHash({
          method: request.method || 'get',
          pathname,
          query: request.params || {},
        }),
      },
      secret,
    );

    return `JWT ${jwtToken}`;
  }

  if (config.authentication?.accessToken) {
    return `Bearer ${config.authentication.accessToken}`;
  }

  if (config.authentication?.basic) {
    return `Basic ${Buffer.from(`${config.authentication.basic.username}:${config.authentication.basic.apiToken || config.authentication.basic.password}`).toString('base64')}`;
  }

  return undefined;
};
