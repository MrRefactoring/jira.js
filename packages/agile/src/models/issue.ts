import { z } from 'zod';
import { OperationsSchema } from '#/models/operations';

/** Details about an issue. */
export const IssueSchema = z.object({
  /** A page of changelogs. */
  changelog: z
    .object({
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
             *   deleted users. In this case, `accountId` returns _unknown_ and all other parameters have fallback
             *   values.
             * - User record unavailable: This usually occurs due to an internal service outage. In this case, all
             *   parameters have fallback values.
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
                 * The display name of the user. Depending on the user’s privacy settings, this may return an
                 * alternative value.
                 */
                displayName: z.string().optional(),
                /**
                 * The email address of the user. Depending on the user’s privacy settings, this may be returned as
                 * null.
                 */
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
    })
    .optional(),
  /** A list of editable field details. */
  editmeta: z
    .object({
      fields: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
  /** Expand options that include additional issue details in the response. */
  expand: z.string().optional(),
  fields: z.record(z.string(), z.any()).optional(),
  fieldsToInclude: z
    .object({
      actuallyIncluded: z.array(z.string()).optional(),
      excluded: z.array(z.string()).optional(),
      included: z.array(z.string()).optional(),
    })
    .optional(),
  /** The ID of the issue. */
  id: z.string().optional(),
  /** The key of the issue. */
  key: z.string().optional(),
  /** The ID and name of each field present on the issue. */
  names: z.record(z.string(), z.any()).optional(),
  operations: OperationsSchema.optional(),
  /** Details of the issue properties identified in the request. */
  properties: z.record(z.string(), z.any()).optional(),
  /** The rendered value of each field present on the issue. */
  renderedFields: z.record(z.string(), z.any()).optional(),
  /** The schema describing each field present on the issue. */
  schema: z.record(z.string(), z.any()).optional(),
  /** The URL of the issue details. */
  self: z.url().optional(),
  /** The transitions that can be performed on the issue. */
  transitions: z
    .array(
      z.object({
        /** Expand options that include additional transition details in the response. */
        expand: z.string().optional(),
        /**
         * Details of the fields associated with the issue transition screen. Use this information to populate `fields`
         * and `update` in a transition request.
         */
        fields: z.record(z.string(), z.any()).optional(),
        /** Whether there is a screen associated with the issue transition. */
        hasScreen: z.boolean().optional(),
        /** The ID of the issue transition. Required when specifying a transition to undertake. */
        id: z.string().optional(),
        /** Whether the transition is available to be performed. */
        isAvailable: z.boolean().optional(),
        /** Whether the issue has to meet criteria before the issue transition is applied. */
        isConditional: z.boolean().optional(),
        /**
         * Whether the issue transition is global, that is, the transition is applied to issues regardless of their
         * status.
         */
        isGlobal: z.boolean().optional(),
        /** Whether this is the initial issue transition for the workflow. */
        isInitial: z.boolean().optional(),
        looped: z.boolean().optional(),
        /** The name of the issue transition. */
        name: z.string().optional(),
        /** A status. */
        to: z
          .object({
            /** The description of the status. */
            description: z.string().optional(),
            /** The URL of the icon used to represent the status. */
            iconUrl: z.string().optional(),
            /** The ID of the status. */
            id: z.string().optional(),
            /** The name of the status. */
            name: z.string().optional(),
            /**
             * The projects the item is associated with. Indicated for items associated with [next-gen
             * projects](https://confluence.atlassian.com/x/loMyO).
             */
            scope: z
              .object({
                /** Details about a project. */
                project: z
                  .object({
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
                    /** The ID of the project. */
                    id: z.string().optional(),
                    /** The key of the project. */
                    key: z.string().optional(),
                    /** The name of the project. */
                    name: z.string().optional(),
                    /** A project category. */
                    projectCategory: z
                      .object({
                        /** The name of the project category. */
                        description: z.string().optional(),
                        /** The ID of the project category. */
                        id: z.string().optional(),
                        /** The description of the project category. */
                        name: z.string().optional(),
                        /** The URL of the project category. */
                        self: z.string().optional(),
                      })
                      .optional(),
                    /**
                     * The [project
                     * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes)
                     * of the project.
                     */
                    projectTypeKey: z.enum(['software', 'service_desk', 'business']).optional(),
                    /** The URL of the project details. */
                    self: z.string().optional(),
                    /** Whether or not the project is simplified. */
                    simplified: z.boolean().optional(),
                  })
                  .optional(),
                /** The type of scope. */
                type: z.enum(['PROJECT', 'TEMPLATE']).optional(),
              })
              .optional(),
            /** The URL of the status. */
            self: z.string().optional(),
            /** A status category. */
            statusCategory: z
              .object({
                /** The name of the color used to represent the status category. */
                colorName: z.string().optional(),
                /** The ID of the status category. */
                id: z.number().optional(),
                /** The key of the status category. */
                key: z.string().optional(),
                /** The name of the status category. */
                name: z.string().optional(),
                /** The URL of the status category. */
                self: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
      }),
    )
    .optional(),
  /** The versions of each field on the issue. */
  versionedRepresentations: z.record(z.string(), z.any()).optional(),
});

export type Issue = z.infer<typeof IssueSchema>;
