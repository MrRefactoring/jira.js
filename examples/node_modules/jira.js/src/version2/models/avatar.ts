import type { AvatarUrls } from './avatarUrls';

/** Details of an avatar. */
export interface Avatar {
  /** The file name of the avatar icon. Returned for system avatars. */
  fileName?: string;
  /** The ID of the avatar. */
  id: string;
  /** Whether the avatar can be deleted. */
  isDeletable: boolean;
  /** Whether the avatar is used in Jira. For example, shown as a project's avatar. */
  isSelected: boolean;
  /** Whether the avatar is a system avatar. */
  isSystemAvatar: boolean;
  /**
   * The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars
   * this is the appropriate identifier, such as the ID for a project or the account ID for a user.
   */
  owner?: string;
  /** The list of avatar icon URLs. */
  urls: AvatarUrls;
}
