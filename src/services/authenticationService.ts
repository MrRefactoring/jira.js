// import { OAuth } from 'oauth';
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
  export function getAuthenticationToken(authentication?: ClientConfig.Authentication): string | undefined {
    if (!authentication) {
      return undefined;
    }

    if (authentication.jwt) {
      return ''; // TODO
    }

    if (authentication.basic) {
      return getBasicAuthenticationToken(authentication.basic);
    }

    if (authentication.oauth) {
      // TODO
      // const oauthUrl = `${config.host}/plugins/servlet/oauth/`;
      // const oauth = new OAuth(
      //   `${oauthUrl}request-token`,
      //   `${oauthUrl}access-token`,
      //   config.authentication.oauth1.consumerKey,
      //   config.authentication.oauth1.consumerSecret,
      //   '1.0',
      //   null,
      //   'RSA-SHA1',
      // );
      //
      // return oauth.authHeader(
      //   new URL(config.host, request.url!).toString(),
      //   config.authentication.oauth1.accessToken,
      //   config.authentication.oauth1.tokenSecret,
      //   request.method!,
      // );
    }

    return undefined;
  }
}
