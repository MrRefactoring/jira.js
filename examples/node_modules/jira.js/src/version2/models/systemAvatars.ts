import type { Avatar } from './avatar';

/** List of system avatars. */
export interface SystemAvatars {
  /** A list of avatar details. */
  system: Omit<Avatar, 'fileName' | 'owner'>[];
}
