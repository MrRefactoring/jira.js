import type { Operations } from './operations';
import type { Fields } from './fields';
import type { Scope } from './scope';
import type { StatusCategory } from './statusCategory';
import type { AvatarUrls } from './avatarUrls';

/** Details about an issue. */
export interface Issue {
  /** A page of changelogs. */
  changelog?: {
    /** The list of changelogs. */
    histories?: {
      /**
       * User details permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:
       *
       * User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case,
       * `displayName` provides an indication and other parameters have default values or are blank (for example, email
       * is blank). User record corrupted: This occurs as a results of events such as a server import and can only
       * happen to deleted users. In this case, `accountId` returns _unknown_ and all other parameters have fallback
       * values. User record unavailable: This usually occurs due to an internal service outage. In this case, all
       * parameters have fallback values.
       */
      author?: {
        /**
         * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
         * _5b10ac8d82e05b22cc7d4ef5_.
         */
        accountId?: string;
        /**
         * The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app'
         * (application user) or 'customer' (Jira Service Desk customer user)
         */
        accountType?: string;
        /** Whether the user is active. */
        active?: boolean;
        avatarUrls?: AvatarUrls;
        /** The display name of the user. Depending on the user’s privacy settings, this may return an alternative value. */
        displayName?: string;
        /** The email address of the user. Depending on the user’s privacy settings, this may be returned as null. */
        emailAddress?: string;
        /** The URL of the user. */
        self?: string;
        /**
         * The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned
         * as null.
         */
        timeZone?: string;
      };
      /** The date on which the change took place. */
      created?: string;
      /** Details of issue history metadata. */
      historyMetadata?: {
        /** The activity described in the history record. */
        activityDescription?: string;
        /** The key of the activity described in the history record. */
        activityDescriptionKey?: string;
        /** Details of user or system associated with a issue history metadata item. */
        actor?: {
          /** The URL to an avatar for the user or system associated with a history record. */
          avatarUrl?: string;
          /** The display name of the user or system associated with a history record. */
          displayName?: string;
          /** The key of the display name of the user or system associated with a history record. */
          displayNameKey?: string;
          /** The ID of the user or system associated with a history record. */
          id?: string;
          /** The type of the user or system associated with a history record. */
          type?: string;
          /** The URL of the user or system associated with a history record. */
          url?: string;
        };
        /** Details of user or system associated with a issue history metadata item. */
        cause?: {
          /** The URL to an avatar for the user or system associated with a history record. */
          avatarUrl?: string;
          /** The display name of the user or system associated with a history record. */
          displayName?: string;
          /** The key of the display name of the user or system associated with a history record. */
          displayNameKey?: string;
          /** The ID of the user or system associated with a history record. */
          id?: string;
          /** The type of the user or system associated with a history record. */
          type?: string;
          /** The URL of the user or system associated with a history record. */
          url?: string;
        };
        /** The description of the history record. */
        description?: string;
        /** The description key of the history record. */
        descriptionKey?: string;
        /** The description of the email address associated the history record. */
        emailDescription?: string;
        /** The description key of the email address associated the history record. */
        emailDescriptionKey?: string;
        /** Additional arbitrary information about the history record. */
        extraData?: unknown;
        /** Details of user or system associated with a issue history metadata item. */
        generator?: {
          /** The URL to an avatar for the user or system associated with a history record. */
          avatarUrl?: string;
          /** The display name of the user or system associated with a history record. */
          displayName?: string;
          /** The key of the display name of the user or system associated with a history record. */
          displayNameKey?: string;
          /** The ID of the user or system associated with a history record. */
          id?: string;
          /** The type of the user or system associated with a history record. */
          type?: string;
          /** The URL of the user or system associated with a history record. */
          url?: string;
        };
        /** The type of the history record. */
        type?: string;
      };
      /** The ID of the changelog. */
      id?: string;
      /** The list of items changed. */
      items?: {
        /** The name of the field changed. */
        field?: string;
        /** The ID of the field changed. */
        fieldId?: string;
        /** The type of the field changed. */
        fieldtype?: string;
        /** The details of the original value. */
        from?: string;
        /** The details of the original value as a string. */
        fromString?: string;
        /** The details of the new value. */
        to?: string;
        /** The details of the new value as a string. */
        toString?: string;
      }[];
    }[];
    /** The maximum number of results that could be on the page. */
    maxResults?: number;
    /** The index of the first item returned on the page. */
    startAt?: number;
    /** The number of results on the page. */
    total?: number;
  };
  /** A list of editable field details. */
  editmeta?: {
    fields?: unknown;
  };
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  fields?: Fields;
  fieldsToInclude?: {
    actuallyIncluded?: string[];
    excluded?: string[];
    included?: string[];
  };
  /** The ID of the issue. */
  id?: string;
  /** The key of the issue. */
  key?: string;
  /** The ID and name of each field present on the issue. */
  names?: unknown;
  operations?: Operations;
  /** Details of the issue properties identified in the request. */
  properties?: unknown;
  /** The rendered value of each field present on the issue. */
  renderedFields?: unknown;
  /** The schema describing each field present on the issue. */
  schema?: unknown;
  /** The URL of the issue details. */
  self?: string;
  /** The transitions that can be performed on the issue. */
  transitions?: {
    /** Expand options that include additional transition details in the response. */
    expand?: string;
    /**
     * Details of the fields associated with the issue transition screen. Use this information to populate `fields` and
     * `update` in a transition request.
     */
    fields?: unknown;
    /** Whether there is a screen associated with the issue transition. */
    hasScreen?: boolean;
    /** The ID of the issue transition. Required when specifying a transition to undertake. */
    id?: string;
    /** Whether the transition is available to be performed. */
    isAvailable?: boolean;
    /** Whether the issue has to meet criteria before the issue transition is applied. */
    isConditional?: boolean;
    /** Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. */
    isGlobal?: boolean;
    /** Whether this is the initial issue transition for the workflow. */
    isInitial?: boolean;
    looped?: boolean;
    /** The name of the issue transition. */
    name?: string;
    /** A status. */
    to?: {
      /** The description of the status. */
      description?: string;
      /** The URL of the icon used to represent the status. */
      iconUrl?: string;
      /** The ID of the status. */
      id?: string;
      /** The name of the status. */
      name?: string;
      /**
       * The projects the item is associated with. Indicated for items associated with [next-gen
       * projects](https://confluence.atlassian.com/x/loMyO).
       */
      scope?: Scope;
      /** The URL of the status. */
      self?: string;
      /** A status category. */
      statusCategory?: StatusCategory;
    };
  }[];
  /** The versions of each field on the issue. */
  versionedRepresentations?: unknown;
}
