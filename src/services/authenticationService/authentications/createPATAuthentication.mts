import { Config } from '@/config.mjs';

export function createPATAuthentication(pat: Config.Authentication.PersonalAccessToken) {
  return `Bearer ${pat}`;
}
