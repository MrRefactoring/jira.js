/** Data related to a specific post-incident review. Must specify at least one association to an incident.* */
export interface GetReviewById {
  /**
   * The PostIncidentReviewData schema version used for this post-incident review data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: '1.0' | string;
  /** The identifier for the Review. Must be unique for a given Provider. */
  id: string;
  /**
   * An ID used to apply an ordering to updates for this Review in the case of out-of-order receipt of update requests.
   *
   * This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the
   * Provider system, but other alternatives are valid (e.g. a Provider could store a counter against each Review and
   * increment that on each update to Jira).
   *
   * Updates for a Review that are received with an updateSqeuenceId lower than what is currently stored will be
   * ignored.
   */
  updateSequenceNumber: number;
  /** The IDs of the Incidents covered by this Review. Must be unique for a given Provider. */
  reviews: string[];
  /**
   * The human-readable summary for the Post-Incident Review. Will be shown in the UI.
   *
   * If not provided, will use the ID for display.
   */
  summary: string;
  /** A description of the review in Markdown format. Will be shown in the UI and used when creating Jira Issues. */
  description: string;
  /**
   * A URL users can use to link to a summary view of this review, if appropriate.
   *
   * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a
   * specific project, it might make sense to link the user to the review in that project).
   */
  url: string;
  /**
   * The timestamp to present to the user that shows when the Review was raised.
   *
   * Expected format is an RFC3339 formatted string.
   */
  createdDate: string;
  /**
   * The last-updated timestamp to present to the user the last time the Review was updated.
   *
   * Expected format is an RFC3339 formatted string.
   */
  lastUpdated: string;
  /** The current status of the Post-Incident Review. */
  status: 'in progress' | 'outstanding actions' | 'completed' | 'unknown' | string;
  /** The IDs of the Jira issues related to this Incident. Must be unique for a given Provider. */
  associations?: {
    /** The type of the association being made */
    associationType?: 'issueIdOrKeys' | 'serviceIdOrKeys' | 'ati:cloud:compass:event-source' | string;
    values?: string[];
  }[];
}
