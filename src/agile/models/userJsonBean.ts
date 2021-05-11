export interface UserJsonBean {
  /** The URL of the user. */
  self?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the <a href="https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/">deprecation notice</a> for details. */
  name?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the <a href="https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/">deprecation notice</a> for details. */
  key?: string;
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, <em>5b10ac8d82e05b22cc7d4ef5</em>. */
  accountId?: string;
  /** The email address of the user. Depending on the user’s privacy settings, this may be returned as null. */
  emailAddress?: string;
  /** Details about the avatars for an item. */
  avatarUrls?: {
    /** The URL of the item's 16x16 pixel avatar. */
    '16x16'?: string;
    /** The URL of the item's 24x24 pixel avatar. */
    '24x24'?: string;
    /** The URL of the item's 32x32 pixel avatar. */
    '32x32'?: string;
    /** The URL of the item's 48x48 pixel avatar. */
    '48x48'?: string;
  };
  /** The display name of the user. Depending on the user’s privacy settings, this may return an alternative value. */
  displayName?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null. */
  timeZone?: string;
  /** The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user) */
  accountType?: string;
}
