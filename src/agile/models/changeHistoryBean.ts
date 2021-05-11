export interface ChangeHistoryBean {
  /** The ID of the changelog. */
  id?: string;
  author?: {
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
  };
  /** The date on which the change took place. */
  created?: string;
  /** The list of items changed. */
  items?: {
    /** The name of the field changed. */
    field?: string;
    /** The type of the field changed. */
    fieldtype?: string;
    /** The ID of the field changed. */
    fieldId?: string;
    /** The details of the original value. */
    from?: string;
    /** The details of the original value as a string. */
    fromString?: string;
    /** The details of the new value. */
    to?: string;
    /** The details of the new value as a string. */
    toString?: string;
  }[];
  /** Details of issue history metadata. */
  historyMetadata?: {
    /** The type of the history record. */
    type?: string;
    /** The description of the history record. */
    description?: string;
    /** The activity described in the history record. */
    activityDescription?: string;
    /** The key of the activity described in the history record. */
    activityDescriptionKey?: string;
    /** The description of the email address associated the history record. */
    emailDescription?: string;
    /** The description key of the email address associated the history record. */
    emailDescriptionKey?: string;
    /** Details of user or system associated with a issue history metadata item. */
    actor?: {
      /** The ID of the user or system associated with a history record. */
      id?: string;
      /** The display name of the user or system associated with a history record. */
      displayName?: string;
      /** The key of the display name of the user or system associated with a history record. */
      displayNameKey?: string;
      /** The type of the user or system associated with a history record. */
      type?: string;
      /** The URL to an avatar for the user or system associated with a history record. */
      avatarUrl?: string;
      /** The URL of the user or system associated with a history record. */
      url?: string;
    };
    /** Details of user or system associated with a issue history metadata item. */
    generator?: {
      /** The ID of the user or system associated with a history record. */
      id?: string;
      /** The display name of the user or system associated with a history record. */
      displayName?: string;
      /** The key of the display name of the user or system associated with a history record. */
      displayNameKey?: string;
      /** The type of the user or system associated with a history record. */
      type?: string;
      /** The URL to an avatar for the user or system associated with a history record. */
      avatarUrl?: string;
      /** The URL of the user or system associated with a history record. */
      url?: string;
    };
    /** Details of user or system associated with a issue history metadata item. */
    cause?: {
      /** The ID of the user or system associated with a history record. */
      id?: string;
      /** The display name of the user or system associated with a history record. */
      displayName?: string;
      /** The key of the display name of the user or system associated with a history record. */
      displayNameKey?: string;
      /** The type of the user or system associated with a history record. */
      type?: string;
      /** The URL to an avatar for the user or system associated with a history record. */
      avatarUrl?: string;
      /** The URL of the user or system associated with a history record. */
      url?: string;
    };
    /** Additional arbitrary information about the history record. */
    extraData?: {};
  };
}
