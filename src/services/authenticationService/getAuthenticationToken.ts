import type { Config } from '../../config';
import { createBasicAuthenticationToken, createOAuth2AuthenticationToken } from './authentications';

export async function getAuthenticationToken(
  authentication: Config['authentication'] | undefined,
): Promise<string | undefined> {
  if (!authentication) {
    return undefined;
  }

  if ('basic' in authentication) {
    return createBasicAuthenticationToken(authentication.basic);
  }

  return createOAuth2AuthenticationToken(authentication.oauth2);
}
