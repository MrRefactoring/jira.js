import type { Config } from '../../../config.js';

export function createPATAuthentication(pat: Config.Authentication.PersonalAccessToken) {
  return `Bearer ${pat}`;
}
