import type { OAuth2 } from '../../../config';

export function createOAuth2AuthenticationToken(authenticationData: OAuth2) {
  return `Bearer ${authenticationData.accessToken}`;
}
