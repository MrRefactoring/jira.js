import type { Avatar } from './avatar.mjs';

/** Details about system and custom avatars. */
export interface Avatars {
  /** Custom avatars list. */
  custom?: Avatar[];
  /** System avatars list. */
  system?: Avatar[];
}
