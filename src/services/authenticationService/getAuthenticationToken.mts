import { Config } from '@/config.mjs';
import {
  createBasicAuthenticationToken,
  createOAuth2AuthenticationToken,
  createPATAuthentication,
} from './authentications/index.mjs';

export async function getAuthenticationToken(
  authentication: Config.Authentication | undefined,
): Promise<string | undefined> {
  if (!authentication) {
    return undefined;
  }

  if (authentication.basic) {
    return createBasicAuthenticationToken(authentication.basic);
  }

  if (authentication.oauth2) {
    return createOAuth2AuthenticationToken(authentication.oauth2);
  }

  if (authentication.personalAccessToken) {
    return createPATAuthentication(authentication.personalAccessToken);
  }

  return undefined;
}
