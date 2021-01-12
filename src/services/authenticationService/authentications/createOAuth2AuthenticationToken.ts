import { ClientConfig } from '../../../clientConfig';

export function createOAuth2AuthenticationToken(authenticationData: ClientConfig.Authentication.OAuth2) {
  return `Bearer ${authenticationData.accessToken}`;
}
