import * as jwt from 'atlassian-jwt';
import { OAuth, OAuth2 } from 'oauth';
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
  export async function getAuthenticationToken(
    authentication: ClientConfig.Authentication | undefined,
    options?: {
      baseURL: string;
      url: string;
      method: string;
    },
  ): Promise<string | undefined> {
    if (!authentication) {
      return undefined;
    }

    if (authentication.jwt) {
      const {
        method,
        url,
      } = options!;

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
      } = options!;

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

    if (authentication.oauth2) {
      if ('accessToken' in authentication.oauth2) {
        return `Bearer ${authentication.oauth2.accessToken}`;
      }

      const oauth2 = new OAuth2(
        authentication.oauth2.clientId,
        authentication.oauth2.clientSecret,
        '',
      );

      // const authorizeUrl = oauth2.getAuthorizeUrl(); // TODO

      const { access_token: token } = await new Promise<any>((resolve, reject) => {
        oauth2.getOAuthAccessToken('' /* TODO */, (error, access_token, refresh_token) => {
          if (error) {
            reject(error);
            return;
          }

          resolve({ access_token, refresh_token });
        });
      });

      return oauth2.buildAuthHeader(token);
    }

    return undefined;
  }
}
