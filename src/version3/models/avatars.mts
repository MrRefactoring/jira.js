import type { Avatar } from './avatar.mjs';

/** Details about system and custom avatars. */
export interface Avatars {
  /** System avatars list. */
  system?: Avatar[];
  /** Custom avatars list. */
  custom?: Avatar[];
}
