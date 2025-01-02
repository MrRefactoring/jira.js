/** Data related to a specific component in a specific workspace that is affected by incidents.* */
export interface GetComponentById {
  /**
   * The DevOpsComponentData schema version used for this devops component data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: '1.0' | string;
  /** The identifier for the DevOps Component. Must be unique for a given Provider. */
  id: string;
  /**
   * An ID used to apply an ordering to updates for this DevOps Component in the case of out-of-order receipt of update
   * requests.
   *
   * This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the
   * Provider system, but other alternatives are valid (e.g. a Provider could store a counter against each DevOps
   * Component and increment that on each update to Jira).
   *
   * Updates for a DevOps Component that are received with an updateSqeuenceId lower than what is currently stored will
   * be ignored.
   */
  updateSequenceNumber: number;
  /** The human-readable name for the DevOps Component. Will be shown in the UI. */
  name: string;
  /** The human-readable name for the Provider that owns this DevOps Component. Will be shown in the UI. */
  providerName?: string;
  /** A description of the DevOps Component in Markdown format. Will be shown in the UI. */
  description: string;
  /**
   * A URL users can use to link to a summary view of this devops component, if appropriate.
   *
   * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a
   * specific project, it might make sense to link the user to the component in that project).
   */
  url: string;
  /** A URL to display a logo representing this devops component, if available. */
  avatarUrl: string;
  /** The tier of the component. Will be shown in the UI. */
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4' | string;
  /** The type of the component. Will be shown in the UI. */
  componentType:
    | 'Service'
    | 'Application'
    | 'Library'
    | 'Capability'
    | 'Cloud resource'
    | 'Data pipeline'
    | 'Machine learning model'
    | 'UI element'
    | 'Website'
    | 'Other'
    | string;
  /**
   * The last-updated timestamp to present to the user the last time the DevOps Component was updated.
   *
   * Expected format is an RFC3339 formatted string.
   */
  lastUpdated: string;
}
