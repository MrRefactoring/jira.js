import { AxiosRequestConfig } from 'axios';
import { Config } from '../config';
import * as jwt from 'atlassian-jwt';
import * as url from 'url';

export const getAuthentication = (config: Config, request?: AxiosRequestConfig): string | undefined => {
  if (config.authentication?.jwt) {
    const { iss, secret, expiryTimeSeconds=180 } = config.authentication.jwt;
    const pathname = url.parse(request.url).pathname;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const jwtToken = jwt.encode(
      {
        iss: iss,
        iat: nowInSeconds,
        exp: nowInSeconds + expiryTimeSeconds,
        qsh: jwt.createQueryStringHash({
          method: request.method,
          pathname,
          query: request.params || {}
        })
      },
      secret
    );

    return 'JWT ' + jwtToken;
  } else if (config.authentication?.accessToken) {
    return 'Bearer ' + config.authentication.accessToken;
  } else if (config.authentication?.basic) {
    return 'Basic ' + Buffer.from(`${config.authentication.basic.username}:${config.authentication.basic.apiToken || config.authentication.basic.password}`).toString('base64');
  }

  return undefined;
};
