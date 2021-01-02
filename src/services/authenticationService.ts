import * as jwt from 'atlassian-jwt';
import { OAuth } from 'oauth';
import { ClientConfig } from '../clientConfig';

function getBasicAuthenticationToken(
  basicAuthentication: ClientConfig.Authentication.Basic,
): string {
  const {
    username,
    password,
    apiToken,
  } = basicAuthentication;

  const buffer = Buffer.from(`${username}:${apiToken ?? password}`);
  const token = buffer.toString('base64');

  return `Basic ${token}`;
}

export namespace AuthenticationService {
  export function getAuthenticationToken(
    authentication: ClientConfig.Authentication | undefined,
    options: {
      baseURL: string;
      url: string;
      method: string;
    },
  ): string | undefined {
    if (!authentication) {
      return undefined;
    }

    if (authentication.jwt) {
      const {
        method,
        url,
      } = options;

      const now = Math.floor(Date.now() / 1000);
      const expire = now + 180;

      const request = jwt.fromMethodAndUrl(method, url);
      const tokenData = {
        iss: authentication.jwt.issuer,
        qsh: jwt.createQueryStringHash(request),
        iat: now,
        exp: expire,
      };

      const token = jwt.encode(tokenData, authentication.jwt.secret);

      return `JWT ${token}`;
    }

    if (authentication.basic) {
      return getBasicAuthenticationToken(authentication.basic);
    }

    if (authentication.oauth) {
      const {
        baseURL,
        url,
        method,
      } = options;

      const oauthUrl = `${baseURL}/plugins/servlet/oauth/`;
      const oauth = new OAuth(
        `${oauthUrl}request-token`,
        `${oauthUrl}access-token`,
        authentication.oauth.consumerKey,
        authentication.oauth.consumerSecret,
        '1.0',
        null,
        'RSA-SHA1',
      );

      return oauth.authHeader(
        new URL(url, baseURL).toString(),
        authentication.oauth.accessToken,
        authentication.oauth.tokenSecret,
        method,
      );
    }

    return undefined;
  }
}
