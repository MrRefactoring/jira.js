import { AxiosRequestConfig } from 'axios';
import * as jwt from 'atlassian-jwt';
import * as url from 'url';
import { Config } from '../config';

export const getAuthentication = (
  config: Config,
  request: AxiosRequestConfig,
): string | undefined => {
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
    const {
      username,
      apiToken,
      password,
    } = config.authentication.basic;

    return `Basic ${Buffer.from(`${username}:${apiToken || password}`).toString('base64')}`;
  }

  return undefined;
};
