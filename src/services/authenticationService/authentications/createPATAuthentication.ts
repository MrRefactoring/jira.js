import { Config } from '../../../config';

export function createPATAuthentication(
  pat: Config.Authentication.PersonalAccessToken,
) {
  return `Bearer ${pat}`;
}
