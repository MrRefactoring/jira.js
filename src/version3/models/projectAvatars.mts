import type { Avatar } from './avatar.mjs';

/** List of project avatars. */
export interface ProjectAvatars {
  /** List of avatars included with Jira. These avatars cannot be deleted. */
  system?: Avatar[];
  /** List of avatars added to Jira. These avatars may be deleted. */
  custom?: Avatar[];
}
