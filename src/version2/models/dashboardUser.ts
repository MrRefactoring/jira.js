import type { UserAvatarUrls } from './userAvatarUrls';

export interface DashboardUser {
  /** The URL of the user. */
  self?: string;
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName?: string;
  /** Whether the user is active. */
  active?: boolean;
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId?: string;
  avatarUrls?: UserAvatarUrls;
}
