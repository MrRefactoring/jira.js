import { OpsbarBean } from './opsbarBean';

export interface IssueBean {
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  /** The ID of the issue. */
  id?: string;
  /** The URL of the issue details. */
  self?: string;
  /** The key of the issue. */
  key?: string;
  /** The rendered value of each field present on the issue. */
  renderedFields?: {};
  /** Details of the issue properties identified in the request. */
  properties?: {};
  /** The ID and name of each field present on the issue. */
  names?: {};
  /** The schema describing each field present on the issue. */
  schema?: {};
  /** The transitions that can be performed on the issue. */
  transitions?: {
    /** The ID of the issue transition. Required when specifying a transition to undertake. */
    id?: string;
    /** The name of the issue transition. */
    name?: string;
    to?: {
      /** The URL of the status. */
      self?: string;
      statusColor?: string;
      /** The description of the status. */
      description?: string;
      /** The URL of the icon used to represent the status. */
      iconUrl?: string;
      /** The name of the status. */
      name?: string;
      /** The ID of the status. */
      id?: string;
      statusCategory?: {
        /** The URL of the status category. */
        self?: string;
        /** The ID of the status category. */
        id?: number;
        /** The key of the status category. */
        key?: string;
        /** The name of the color used to represent the status category. */
        colorName?: string;
        /** The name of the status category. */
        name?: string;
      };
    };
    /** Whether there is a screen associated with the issue transition. */
    hasScreen?: boolean;
    /** Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. */
    isGlobal?: boolean;
    /** Whether this is the initial issue transition for the workflow. */
    isInitial?: boolean;
    /** Whether the transition is available to be performed. */
    isAvailable?: boolean;
    /** Whether the issue has to meet criteria before the issue transition is applied. */
    isConditional?: boolean;
    /** Details of the fields associated with the issue transition screen. Use this information to populate <code>fields</code> and <code>update</code> in a transition request. */
    fields?: {};
    /** Expand options that include additional transition details in the response. */
    expand?: string;
    looped?: boolean;
  }[];
  operations?: OpsbarBean;
  editmeta?: {
    /** A list of editable field details. */
    fields?: any;
  };
  changelog?: {
    /** The index of the first item returned on the page. */
    startAt?: number;
    /** The maximum number of results that could be on the page. */
    maxResults?: number;
    /** The number of results on the page. */
    total?: number;
    /** The list of changelogs. */
    histories?: {
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
    }[];
  };
  /** The versions of each field on the issue. */
  versionedRepresentations?: {};
  fields?: Record<string, any>; // TODO clarify
}
