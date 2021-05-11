/**
 * Details of issue history metadata. */
export interface HistoryMetadata {
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
}
