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
  summary: Record<string, any>;
  /** Detail information for this Feature Flag.

    This may be information for each environment the Feature Flag is defined in or a selection of environments made by the user, as appropriate.
    */
  details: Record<string, any>[];
}
