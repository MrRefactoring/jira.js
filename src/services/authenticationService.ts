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

    if (authentication.accessToken) {
      return `Bearer ${authentication.accessToken}`;
    }

    if (authentication.basic) {
      return getBasicAuthenticationToken(authentication.basic);
    }

    return undefined;
  }
}
