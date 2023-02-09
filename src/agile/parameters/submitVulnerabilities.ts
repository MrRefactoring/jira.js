export interface SubmitVulnerabilities {
  /**
   * Properties assigned to vulnerability data that can then be used for delete / query operations.
   *
   * Examples might be an account or user ID that can then be used to clean up data if an account is removed from the
   * Provider system.
   *
   * Properties are supplied as key/value pairs, and a maximum of 5 properties can be supplied, keys cannot contain ':'
   * or start with '_'.
   */
  properties?: {};
  vulnerabilities?: {
    /**
     * The VulnerabilityData schema version used for this vulnerability data.
     *
     * Placeholder to support potential schema changes in the future.
     */
    schemaVersion: string;
    /** The identifier for the Vulnerability. Must be unique for a given Provider. */
    id: string;
    /**
     * An ID used to apply an ordering to updates for this Vulnerability in the case of out-of-order receipt of update
     * requests.
     *
     * This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the
     * Provider system, but other alternatives are valid (e.g. a Provider could store a counter against each
     * Vulnerability and increment that on each update to Jira).
     *
     * Updates for a Vulnerability that are received with an updateSqeuenceId lower than what is currently stored will
     * be ignored.
     */
    updateSequenceNumber: number;
    /** The identifier of the Container where this Vulnerability was found. Must be unique for a given Provider. */
    containerId: string;
    /**
     * The human-readable name for the Vulnerability. Will be shown in the UI.
     *
     * If not provided, will use the ID for display.
     */
    displayName: string;
    /** A description of the issue in Markdown format. Will be shown in the UI and used when creating Jira Issues. */
    description: string;
    /**
     * A URL users can use to link to a summary view of this vulnerability, if appropriate.
     *
     * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a
     * specific project, it might make sense to link the user to the vulnerability in that project).
     */
    url: string;
    /** The type of Vulnerability detected. */
    type: string;
    /**
     * The timestamp to present to the user that shows when the Vulnerability was introduced.
     *
     * Expected format is an RFC3339 formatted string.
     */
    introducedDate: string;
    /**
     * The last-updated timestamp to present to the user the last time the Vulnerability was updated.
     *
     * Expected format is an RFC3339 formatted string.
     */
    lastUpdated: string;
    /**
     * Severity information for a single Vulnerability.
     *
     * This is the severity information that will be presented to the user on e.g. the Jira Security screen.
     */
    severity: {
      /** The severity level of the Vulnerability. */
      level: string;
    };
    /** The identifying information for the Vulnerability. */
    identifiers?: {
      /** The display name of the Vulnerability identified. */
      displayName: string;
      /** A URL users can use to link to the definition of the Vulnerability identified. */
      url: string;
    }[];
    /** The current status of the Vulnerability. */
    status: string;
    /** The entities to associate the Security Vulnerability information with. */
    associations?: {}[];
  }[];
  /**
   * Information about the provider. This is useful for auditing, logging, debugging, and other internal uses.
   * Information in this property is not considered private, so it should not contain personally identifiable
   * information
   */
  providerMetadata?: {
    /** An optional name of the source of the vulnerabilities. */
    product?: string;
  };
}
