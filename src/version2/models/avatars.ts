import type { Avatar } from './avatar';

/** Details about system and custom avatars. */
export interface Avatars {
  /** Custom avatars list. */
  custom: Avatar[];
  /** System avatars list. */
  system: Avatar[];
}
