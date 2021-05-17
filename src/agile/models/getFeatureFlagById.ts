/**
 * Data related to a single Feature Flag, across any Environment that the flag is present in.
 *  */
export interface GetFeatureFlagById {
  /** The FeatureFlagData schema version used for this flag data.

   Placeholder to support potential schema changes in the future.
   */
  schemaVersion?: string;
  /** The identifier for the Feature Flag. Must be unique for a given Provider.
   */
  id: string;
  /** The identifier that users would use to reference the Feature Flag in their source code etc.

   Will be made available via the UI for users to copy into their source code etc.
   */
  key: string;
  /** An ID used to apply an ordering to updates for this Feature Flag in the case of out-of-order receipt of update requests.

   This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the Provider system, but other alternatives are valid (e.g. a Provider could store a counter against each Feature Flag and increment that on each update to Jira).

   Updates for a Feature Flag that are received with an updateSqeuenceId lower than what is currently stored will be ignored.
   */
  updateSequenceId: number;
  /** The human-readable name for the Feature Flag. Will be shown in the UI.

   If not provided, will use the ID for display.
   */
  displayName?: string;
  /** The Jira issue keys to associate the Feature Flag information with.
   */
  issueKeys: string[];
  /** Summary information for a single Feature Flag.

   Providers may elect to provide information from a specific environment, or they may choose to 'roll up' information from across multiple environments - whatever makes most sense in the Provider system.

   This is the summary information that will be presented to the user on e.g. the Jira issue screen.
   */
  summary: {
    /** A URL users can use to link to a summary view of this flag, if appropriate.

     This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a specific environment, it might make sense to link the user to the flag in that environment).
     */
    url?: string;
    /** Status information about a single Feature Flag.
     */
    status: {
      /** Whether the Feature Flag is enabled in the given environment (or in summary).

       Enabled may imply a partial rollout, which can be described using the 'rollout' field.
       */
      enabled: boolean;
      /** The value served by this Feature Flag when it is disabled. This could be the actual value or an alias, as appropriate.

       This value may be presented to the user in the UI.
       */
      defaultValue?: string;
      /** Information about the rollout of a Feature Flag in an environment (or in summary).

       Only one of 'percentage', 'text', or 'rules' should be provided. They will be used in that order if multiple are present.

       This information may be presented to the user in the UI.
       */
      rollout?: {
        /** If the Feature Flag rollout is a simple percentage rollout
         */
        percentage?: number;
        /** A text status to display that represents the rollout. This could be e.g. a named cohort.
         */
        text?: string;
        /** A count of the number of rules active for this Feature Flag in an environment.
         */
        rules?: number;
      };
    };
    /** The last-updated timestamp to present to the user as a summary of the state of the Feature Flag.

     Providers may choose to supply the last-updated timestamp from a specific environment, or the 'most recent' last-updated timestamp across all environments - whatever makes sense in the Provider system.

     Expected format is an RFC3339 formatted string.
     */
    lastUpdated: string;
  };
  /** Detail information for this Feature Flag.

   This may be information for each environment the Feature Flag is defined in or a selection of environments made by the user, as appropriate.
   */
  details: {
    /** A URL users can use to link to this Feature Flag, in this environment.
     */
    url: string;
    /** The last-updated timestamp for this Feature Flag, in this environment.

     Expected format is an RFC3339 formatted string.
     */
    lastUpdated: string;
    /** Details of a single environment.

     At the simplest this must be the name of the environment.

     Ideally there is also type information which may be used to group data from multiple Feature Flags and other entities for visualisation in the UI.
     */
    environment: {
      /** The name of the environment. */
      name: string;
      /** The 'type' or 'category' of environment this environment belongs to. */
      type?: string;
    };
    /** Status information about a single Feature Flag.
     */
    status: {
      /** Whether the Feature Flag is enabled in the given environment (or in summary).

       Enabled may imply a partial rollout, which can be described using the 'rollout' field.
       */
      enabled: boolean;
      /** The value served by this Feature Flag when it is disabled. This could be the actual value or an alias, as appropriate.

       This value may be presented to the user in the UI.
       */
      defaultValue?: string;
      /** Information about the rollout of a Feature Flag in an environment (or in summary).

       Only one of 'percentage', 'text', or 'rules' should be provided. They will be used in that order if multiple are present.

       This information may be presented to the user in the UI.
       */
      rollout?: {
        /** If the Feature Flag rollout is a simple percentage rollout
         */
        percentage?: number;
        /** A text status to display that represents the rollout. This could be e.g. a named cohort.
         */
        text?: string;
        /** A count of the number of rules active for this Feature Flag in an environment.
         */
        rules?: number;
      };
    };
  }[];
}
