import type { Avatar } from './avatar';

/** List of project avatars. */
export interface ProjectAvatars {
  /** List of avatars added to Jira. These avatars may be deleted. */
  custom?: Avatar[];
  /** List of avatars included with Jira. These avatars cannot be deleted. */
  system?: Avatar[];
}
