import type { Config } from '../../../config.js';

export function createOAuth2AuthenticationToken(authenticationData: Config.Authentication.OAuth2) {
  return `Bearer ${authenticationData.accessToken}`;
}
