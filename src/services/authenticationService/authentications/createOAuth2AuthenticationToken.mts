import { Config } from '@/config.mjs';

export function createOAuth2AuthenticationToken(authenticationData: Config.Authentication.OAuth2) {
  return `Bearer ${authenticationData.accessToken}`;
}
