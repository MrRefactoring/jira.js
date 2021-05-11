export interface BoardBean {
  id?: number;
  self?: string;
  name?: string;
  type?: string;
  admins?: {
    users?: {
      /** This property is deprecated in favor of <code>accountId</code> because of privacy changes. See the <a href="https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/">migration guide</a> for details. <br>The key of the user. */
      key?: string;
      /** The URL of the user. */
      self?: string;
      /** This property is deprecated in favor of <code>accountId</code> because of privacy changes. See the <a href="https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/">migration guide</a> for details. <br>The username of the user. */
      name?: string;
      /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
      displayName?: string;
      /** Whether the user is active. */
      active?: boolean;
      /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, <em>5b10ac8d82e05b22cc7d4ef5</em>. */
      accountId?: string;
      /** Details of a user's avatars. */
      avatarUrls?: {
        /** The URL of the user's 24x24 pixel avatar. */
        '24x24'?: string;
        /** The URL of the user's 16x16 pixel avatar. */
        '16x16'?: string;
        /** The URL of the user's 32x32 pixel avatar. */
        '32x32'?: string;
        /** The URL of the user's 48x48 pixel avatar. */
        '48x48'?: string;
      };
    }[];
    groups?: {
      name?: string;
      self?: string;
    }[];
  };
  location?: {
    projectId?: number;
    userId?: number;
    userAccountId?: string;
    displayName?: string;
    projectName?: string;
    projectKey?: string;
    projectTypeKey?: string;
    avatarURI?: string;
    name?: string;
  };
  canEdit?: boolean;
  isPrivate?: boolean;
  favourite?: boolean;
}
