export interface SubmitVulnerabilities {
  /**
   * Indicates the operation being performed by the provider system when sending this data. "NORMAL" - Data received
   * during real-time, user-triggered actions (e.g. user closed or updated a vulnerability). "SCAN" - Data sent through
   * some automated process (e.g. some periodically scheduled repository scan). "BACKFILL" - Data received while
   * backfilling existing data (e.g. pushing historical vulnerabilities when re-connect a workspace). Default is
   * "NORMAL". "NORMAL" traffic has higher priority but tighter rate limits, "SCAN" traffic has medium priority and
   * looser limits, "BACKFILL" has lower priority and much looser limits
   */
  operationType?: 'NORMAL' | 'SCAN' | 'BACKFILL' | string;
  /**
   * Properties assigned to vulnerability data that can then be used for delete / query operations.
   *
   * Examples might be an account or user ID that can then be used to clean up data if an account is removed from the
   * Provider system.
   *
   * Properties are supplied as key/value pairs, and a maximum of 5 properties can be supplied, keys cannot contain ':'
   * or start with '_'.
   */
  properties?: unknown;
  vulnerabilities?: {
    /**
     * The VulnerabilityData schema version used for this vulnerability data.
     *
     * Placeholder to support potential schema changes in the future.
     */
    schemaVersion: '1.0' | string;
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
     * Updates for a Vulnerability that are received with an updateSequenceId lower than what is currently stored will
     * be ignored.
     */
    updateSequenceNumber: number;
    /**
     * The identifier of the Container where this Vulnerability was found. Must be unique for a given Provider. This
     * must follow this regex pattern: `[a-zA-Z0-9\\-_.~@:{}=]+(/[a-zA-Z0-9\\-_.~@:{}=]+)*`
     */
    containerId: string;
    /**
     * The human-readable name for the Vulnerability. Will be shown in the UI.
     *
     * If not provided, will use the ID for display.
     */
    displayName: string;
    /**
     * A description of the issue in markdown format that will be shown in the UI and used when creating Jira Issues.
     * HTML tags are not supported in the markdown format. For creating a new line `\n` can be used. Read more about the
     * accepted markdown transformations
     * [here](https://atlaskit.atlassian.com/packages/editor/editor-markdown-transformer).
     */
    description: string;
    /**
     * A URL users can use to link to a summary view of this vulnerability, if appropriate.
     *
     * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a
     * specific project, it might make sense to link the user to the vulnerability in that project).
     */
    url: string;
    /** The type of Vulnerability detected. */
    type: 'sca' | 'sast' | 'dast' | 'unknown' | string;
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
      level: 'critical' | 'high' | 'medium' | 'low' | 'unknown' | string;
    };
    /** The identifying information for the Vulnerability. */
    identifiers?: {
      /** The display name of the Vulnerability identified. */
      displayName: string;
      /** A URL users can use to link to the definition of the Vulnerability identified. */
      url: string;
    }[];
    /** The current status of the Vulnerability. */
    status: 'open' | 'closed' | 'ignored' | 'unknown' | string;
    /**
     * Extra information (optional). This data will be shown in the security feature under the vulnerability
     * displayName.
     */
    additionalInfo?: {
      /** The content of the additionalInfo. */
      content: string;
      /** Optional URL linking to the information */
      url?: string;
    };
    /** The entities to associate the Security Vulnerability information with. */
    associations?: unknown[];
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
