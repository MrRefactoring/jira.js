/** @deprecated Use {@link BoardAdmins} instead. */
export type BoardAdminsBean = BoardAdmins;

/** The users and groups who own the board. */
export interface BoardAdmins {
  users?: {
    /**
     * @deprecated This property is deprecated in favor of `accountId` because of privacy changes. See the [migration
     *   guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
     *   for details. The key of the user.
     */
    key?: string;
    /** The URL of the user. */
    self?: string;
    /**
     * @deprecated This property is deprecated in favor of `accountId` because of privacy changes. See the [migration
     *   guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
     *   for details. The username of the user.
     */
    name?: string;
    /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
    displayName?: string;
    /** Whether the user is active. */
    active?: boolean;
    /**
     * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
     * _5b10ac8d82e05b22cc7d4ef5_.
     */
    accountId?: string;
    avatarUrls?: {
      /** The URL of the user's 24x24 pixel avatar. */
      '24x24'?: string;
      /** The URL of the user's 32x32 pixel avatar. */
      '32x32'?: string;
      /** The URL of the user's 48x48 pixel avatar. */
      '48x48'?: string;
      /** The URL of the user's 16x16 pixel avatar. */
      '16x16'?: string;
    };
  }[];
  groups?: {
    name?: string;
    self?: string;
  }[];
}
