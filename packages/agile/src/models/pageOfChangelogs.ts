import { z } from 'zod';

/** A page of changelogs. */
export const PageOfChangelogsSchema = z.object({
  /** The list of changelogs. */
  histories: z
    .array(
      z.object({
        /**
         * User details permitted by the user's Atlassian Account privacy settings. However, be aware of these
         * exceptions:
         *
         * - User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this
         *   case, `displayName` provides an indication and other parameters have default values or are blank (for
         *   example, email is blank).
         * - User record corrupted: This occurs as a results of events such as a server import and can only happen to
         *   deleted users. In this case, `accountId` returns _unknown_ and all other parameters have fallback values.
         * - User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters
         *   have fallback values.
         */
        author: z
          .object({
            /**
             * The account ID of the user, which uniquely identifies the user across all Atlassian products. For
             * example, _5b10ac8d82e05b22cc7d4ef5_.
             */
            accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
            /**
             * The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app'
             * (application user) or 'customer' (Jira Service Desk customer user)
             */
            accountType: z.string().optional(),
            /** Whether the user is active. */
            active: z.boolean().optional(),
            avatarUrls: z
              .object({
                /** The URL of the item's 16x16 pixel avatar. */
                '16x16': z.url().optional(),
                /** The URL of the item's 24x24 pixel avatar. */
                '24x24': z.url().optional(),
                /** The URL of the item's 32x32 pixel avatar. */
                '32x32': z.url().optional(),
                /** The URL of the item's 48x48 pixel avatar. */
                '48x48': z.url().optional(),
              })
              .optional(),
            /**
             * The display name of the user. Depending on the user’s privacy settings, this may return an alternative
             * value.
             */
            displayName: z.string().optional(),
            /** The email address of the user. Depending on the user’s privacy settings, this may be returned as null. */
            emailAddress: z.string().optional(),
            /** The URL of the user. */
            self: z.string().optional(),
            /**
             * The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be
             * returned as null.
             */
            timeZone: z.string().optional(),
          })
          .optional(),
        /** The date on which the change took place. */
        created: z
          .string()
          .transform(s => new Date(s))
          .optional(),
        /** Details of issue history metadata. */
        historyMetadata: z
          .object({
            /** The activity described in the history record. */
            activityDescription: z.string().optional(),
            /** The key of the activity described in the history record. */
            activityDescriptionKey: z.string().optional(),
            /** Details of user or system associated with a issue history metadata item. */
            actor: z
              .object({
                /** The URL to an avatar for the user or system associated with a history record. */
                avatarUrl: z.string().optional(),
                /** The display name of the user or system associated with a history record. */
                displayName: z.string().optional(),
                /** The key of the display name of the user or system associated with a history record. */
                displayNameKey: z.string().optional(),
                /** The ID of the user or system associated with a history record. */
                id: z.string().optional(),
                /** The type of the user or system associated with a history record. */
                type: z.string().optional(),
                /** The URL of the user or system associated with a history record. */
                url: z.string().optional(),
              })
              .optional(),
            /** Details of user or system associated with a issue history metadata item. */
            cause: z
              .object({
                /** The URL to an avatar for the user or system associated with a history record. */
                avatarUrl: z.string().optional(),
                /** The display name of the user or system associated with a history record. */
                displayName: z.string().optional(),
                /** The key of the display name of the user or system associated with a history record. */
                displayNameKey: z.string().optional(),
                /** The ID of the user or system associated with a history record. */
                id: z.string().optional(),
                /** The type of the user or system associated with a history record. */
                type: z.string().optional(),
                /** The URL of the user or system associated with a history record. */
                url: z.string().optional(),
              })
              .optional(),
            /** The description of the history record. */
            description: z.string().optional(),
            /** The description key of the history record. */
            descriptionKey: z.string().optional(),
            /** The description of the email address associated the history record. */
            emailDescription: z.string().optional(),
            /** The description key of the email address associated the history record. */
            emailDescriptionKey: z.string().optional(),
            /** Additional arbitrary information about the history record. */
            extraData: z.record(z.string(), z.any()).optional(),
            /** Details of user or system associated with a issue history metadata item. */
            generator: z
              .object({
                /** The URL to an avatar for the user or system associated with a history record. */
                avatarUrl: z.string().optional(),
                /** The display name of the user or system associated with a history record. */
                displayName: z.string().optional(),
                /** The key of the display name of the user or system associated with a history record. */
                displayNameKey: z.string().optional(),
                /** The ID of the user or system associated with a history record. */
                id: z.string().optional(),
                /** The type of the user or system associated with a history record. */
                type: z.string().optional(),
                /** The URL of the user or system associated with a history record. */
                url: z.string().optional(),
              })
              .optional(),
            /** The type of the history record. */
            type: z.string().optional(),
          })
          .optional(),
        /** The ID of the changelog. */
        id: z.string().optional(),
        /** The list of items changed. */
        items: z
          .array(
            z.object({
              /** The name of the field changed. */
              field: z.string().optional(),
              /** The ID of the field changed. */
              fieldId: z.string().optional(),
              /** The type of the field changed. */
              fieldtype: z.string().optional(),
              /** The details of the original value. */
              from: z.string().optional(),
              /** The details of the original value as a string. */
              fromString: z.string().optional(),
              /** The details of the new value. */
              to: z.string().optional(),
              /** The details of the new value as a string. */
              toString: z.string().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().optional(),
  /** The number of results on the page. */
  total: z.number().optional(),
});

export type PageOfChangelogs = z.infer<typeof PageOfChangelogsSchema>;
