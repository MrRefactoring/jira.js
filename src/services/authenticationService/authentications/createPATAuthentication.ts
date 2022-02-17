import { Config } from '../../../config';

export function createPATAuthentication(
  authenticationData: Config.Authentication.PAT,
) {
  return `Bearer ${authenticationData.pat}`;
}
