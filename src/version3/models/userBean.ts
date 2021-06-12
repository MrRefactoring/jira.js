import { UserBeanAvatarUrls } from './userBeanAvatarUrls';

export interface UserBean {
  /**
   * This property is deprecated in favor of `accountId` because of privacy changes. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The key of the user.
   */
  key?: string;
  /** The URL of the user. */
  self?: string;
  /**
   * This property is deprecated in favor of `accountId` because of privacy changes. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The username of the user.
   */
  name?: string;
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName?: string;
  /** Whether the user is active. */
  active?: boolean;
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * *5b10ac8d82e05b22cc7d4ef5*.
   */
  accountId?: string;
  avatarUrls?: UserBeanAvatarUrls;
}
