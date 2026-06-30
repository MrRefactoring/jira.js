import type { Config } from '../../config';
import {
  createBasicAuthenticationToken,
  createJWTAuthentication,
  createOAuth2AuthenticationToken,
} from './authentications';

export async function getAuthenticationToken(
  authentication: Config['authentication'] | undefined,
  requestData?: { method: string; url: string },
): Promise<string | undefined> {
  if (!authentication) {
    return undefined;
  }

  if ('basic' in authentication) {
    return createBasicAuthenticationToken(authentication.basic);
  }

  if ('jwt' in authentication) {
    if (!requestData) {
      throw new Error('JWT authentication requires request data (method and url) to compute the query-string hash.');
    }

    return createJWTAuthentication(authentication.jwt, requestData);
  }

  if (!authentication.oauth2.accessToken) {
    throw new Error('OAuth 2.0 authentication without auto-refresh requires an `accessToken`.');
  }

  return createOAuth2AuthenticationToken(authentication.oauth2);
}
