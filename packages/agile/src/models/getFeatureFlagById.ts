import { z } from 'zod';
import { IssueIdOrKeysAssociationSchema } from './issueIdOrKeysAssociation';

/** Data related to a single Feature Flag, across any Environment that the flag is present in.* */
export const GetFeatureFlagByIdSchema = z.object({
  /**
   * The FeatureFlagData schema version used for this flag data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: z.enum(['1.0']).optional(),
  /** The identifier for the Feature Flag. Must be unique for a given Provider. */
  id: z.string().max(255, 'id must be at most 255 characters'),
  /**
   * The identifier that users would use to reference the Feature Flag in their source code etc.
   *
   * Will be made available via the UI for users to copy into their source code etc.
   */
  key: z.string().max(255, 'key must be at most 255 characters'),
  /**
   * An ID used to apply an ordering to updates for this Feature Flag in the case of out-of-order receipt of update
   * requests.
   *
   * This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the
   * Provider system, but other alternatives are valid (e.g. a Provider could store a counter against each Feature Flag
   * and increment that on each update to Jira).
   *
   * Updates for a Feature Flag that are received with an updateSqeuenceId lower than what is currently stored will be
   * ignored.
   */
  updateSequenceId: z.number(),
  /**
   * The human-readable name for the Feature Flag. Will be shown in the UI.
   *
   * If not provided, will use the ID for display.
   */
  displayName: z.string().max(255, 'displayName must be at most 255 characters').optional(),
  /** The Jira issue keys or IDs to associate the feature flag with. */
  associations: z.array(IssueIdOrKeysAssociationSchema).optional(),
  /**
   * Summary information for a single Feature Flag.
   *
   * Providers may elect to provide information from a specific environment, or they may choose to 'roll up' information
   * from across multiple environments - whatever makes most sense in the Provider system.
   *
   * This is the summary information that will be presented to the user on e.g. the Jira issue screen.
   */
  summary: z.object({
    /**
     * A URL users can use to link to a summary view of this flag, if appropriate.
     *
     * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a
     * specific environment, it might make sense to link the user to the flag in that environment).
     */
    url: z.url().max(2000, 'url must be at most 2000 characters').optional(),
    /** Status information about a single Feature Flag. */
    status: z.object({
      /**
       * Whether the Feature Flag is enabled in the given environment (or in summary).
       *
       * Enabled may imply a partial rollout, which can be described using the 'rollout' field.
       */
      enabled: z.boolean(),
      /**
       * The value served by this Feature Flag when it is disabled. This could be the actual value or an alias, as
       * appropriate.
       *
       * This value may be presented to the user in the UI.
       */
      defaultValue: z.string().max(255, 'defaultValue must be at most 255 characters').optional(),
      /**
       * Information about the rollout of a Feature Flag in an environment (or in summary).
       *
       * Only one of 'percentage', 'text', or 'rules' should be provided. They will be used in that order if multiple
       * are present.
       *
       * This information may be presented to the user in the UI.
       */
      rollout: z
        .object({
          /** If the Feature Flag rollout is a simple percentage rollout */
          percentage: z.number().optional(),
          /** A text status to display that represents the rollout. This could be e.g. a named cohort. */
          text: z.string().max(255, 'text must be at most 255 characters').optional(),
          /** A count of the number of rules active for this Feature Flag in an environment. */
          rules: z.number().optional(),
        })
        .optional(),
    }),
    /**
     * The last-updated timestamp to present to the user as a summary of the state of the Feature Flag.
     *
     * Providers may choose to supply the last-updated timestamp from a specific environment, or the 'most recent'
     * last-updated timestamp across all environments - whatever makes sense in the Provider system.
     *
     * Expected format is an RFC3339 formatted string.
     */
    lastUpdated: z.string().transform(s => new Date(s)),
  }),
  /**
   * Detail information for this Feature Flag.
   *
   * This may be information for each environment the Feature Flag is defined in or a selection of environments made by
   * the user, as appropriate.
   */
  details: z.array(
    z.object({
      /** A URL users can use to link to this Feature Flag, in this environment. */
      url: z.url().max(2000, 'url must be at most 2000 characters'),
      /**
       * The last-updated timestamp for this Feature Flag, in this environment.
       *
       * Expected format is an RFC3339 formatted string.
       */
      lastUpdated: z.string().transform(s => new Date(s)),
      /**
       * Details of a single environment.
       *
       * At the simplest this must be the name of the environment.
       *
       * Ideally there is also type information which may be used to group data from multiple Feature Flags and other
       * entities for visualisation in the UI.
       */
      environment: z.object({
        /** The name of the environment. */
        name: z.string().max(255, 'name must be at most 255 characters'),
        /** The 'type' or 'category' of environment this environment belongs to. */
        type: z.enum(['development', 'testing', 'staging', 'production']).optional(),
      }),
      /** Status information about a single Feature Flag. */
      status: z.object({
        /**
         * Whether the Feature Flag is enabled in the given environment (or in summary).
         *
         * Enabled may imply a partial rollout, which can be described using the 'rollout' field.
         */
        enabled: z.boolean(),
        /**
         * The value served by this Feature Flag when it is disabled. This could be the actual value or an alias, as
         * appropriate.
         *
         * This value may be presented to the user in the UI.
         */
        defaultValue: z.string().max(255, 'defaultValue must be at most 255 characters').optional(),
        /**
         * Information about the rollout of a Feature Flag in an environment (or in summary).
         *
         * Only one of 'percentage', 'text', or 'rules' should be provided. They will be used in that order if multiple
         * are present.
         *
         * This information may be presented to the user in the UI.
         */
        rollout: z
          .object({
            /** If the Feature Flag rollout is a simple percentage rollout */
            percentage: z.number().optional(),
            /** A text status to display that represents the rollout. This could be e.g. a named cohort. */
            text: z.string().max(255, 'text must be at most 255 characters').optional(),
            /** A count of the number of rules active for this Feature Flag in an environment. */
            rules: z.number().optional(),
          })
          .optional(),
      }),
    }),
  ),
});

export type GetFeatureFlagById = z.infer<typeof GetFeatureFlagByIdSchema>;
