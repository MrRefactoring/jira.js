import { Config } from '../../../config';

export function createPATAuthentication(
  pat: Config.Authentication.PAT,
) {
  return `Bearer ${pat}`;
}
