import { z } from 'zod';

export const SubmitVulnerabilitiesSchema = z.object({
  /**
   * Indicates the operation being performed by the provider system when sending this data. "NORMAL" - Data received
   * during real-time, user-triggered actions (e.g. user closed or updated a vulnerability). "SCAN" - Data sent through
   * some automated process (e.g. some periodically scheduled repository scan). "BACKFILL" - Data received while
   * backfilling existing data (e.g. pushing historical vulnerabilities when re-connect a workspace). Default is
   * "NORMAL". "NORMAL" traffic has higher priority but tighter rate limits, "SCAN" traffic has medium priority and
   * looser limits, "BACKFILL" has lower priority and much looser limits
   */
  operationType: z.enum(['NORMAL', 'SCAN', 'BACKFILL']).optional(),
  /**
   * Properties assigned to vulnerability data that can then be used for delete / query operations.
   *
   * Examples might be an account or user ID that can then be used to clean up data if an account is removed from the
   * Provider system.
   *
   * Properties are supplied as key/value pairs, and a maximum of 5 properties can be supplied, keys cannot contain ':'
   * or start with '_'.
   */
  properties: z.record(z.string(), z.any()).optional(),
  vulnerabilities: z.array(
    z.object({
      /**
       * The VulnerabilityData schema version used for this vulnerability data.
       *
       * Placeholder to support potential schema changes in the future.
       */
      schemaVersion: z.enum(['1.0']),
      /** The identifier for the Vulnerability. Must be unique for a given Provider. */
      id: z.string().max(255, 'id must be at most 255 characters'),
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
      updateSequenceNumber: z.number(),
      /**
       * The identifier of the Container where this Vulnerability was found. Must be unique for a given Provider. This
       * must follow this regex pattern: `[a-zA-Z0-9\\-_.~@:{}=]+(/[a-zA-Z0-9\\-_.~@:{}=]+)*`
       */
      containerId: z.string().max(255, 'containerId must be at most 255 characters'),
      /**
       * The human-readable name for the Vulnerability. Will be shown in the UI.
       *
       * If not provided, will use the ID for display.
       */
      displayName: z.string().max(255, 'displayName must be at most 255 characters'),
      /**
       * A description of the issue in markdown format that will be shown in the UI and used when creating Jira Issues.
       * HTML tags are not supported in the markdown format. For creating a new line `\n` can be used. Read more about
       * the accepted markdown transformations
       * [here](https://atlaskit.atlassian.com/packages/editor/editor-markdown-transformer).
       */
      description: z.string().max(5000, 'description must be at most 5000 characters'),
      /**
       * A URL users can use to link to a summary view of this vulnerability, if appropriate.
       *
       * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from
       * a specific project, it might make sense to link the user to the vulnerability in that project).
       */
      url: z.url().max(2000, 'url must be at most 2000 characters'),
      /** The type of Vulnerability detected. */
      type: z.enum(['sca', 'sast', 'dast', 'unknown']),
      /**
       * The timestamp to present to the user that shows when the Vulnerability was introduced.
       *
       * Expected format is an RFC3339 formatted string.
       */
      introducedDate: z.string().transform(s => new Date(s)),
      /**
       * The last-updated timestamp to present to the user the last time the Vulnerability was updated.
       *
       * Expected format is an RFC3339 formatted string.
       */
      lastUpdated: z.string().transform(s => new Date(s)),
      /**
       * Severity information for a single Vulnerability.
       *
       * This is the severity information that will be presented to the user on e.g. the Jira Security screen.
       */
      severity: z.object({
        /** The severity level of the Vulnerability. */
        level: z.enum(['critical', 'high', 'medium', 'low', 'unknown']),
      }),
      /** The identifying information for the Vulnerability. */
      identifiers: z
        .array(
          z.object({
            /** The display name of the Vulnerability identified. */
            displayName: z.string().max(255, 'displayName must be at most 255 characters'),
            /** A URL users can use to link to the definition of the Vulnerability identified. */
            url: z.url().max(2000, 'url must be at most 2000 characters'),
          }),
        )
        .optional(),
      /** The current status of the Vulnerability. */
      status: z.enum(['open', 'closed', 'ignored', 'unknown']),
      /**
       * Extra information (optional). This data will be shown in the security feature under the vulnerability
       * displayName.
       */
      additionalInfo: z
        .object({
          /** The content of the additionalInfo. */
          content: z.string().max(255, 'content must be at most 255 characters'),
          /** Optional URL linking to the information */
          url: z.url().max(2000, 'url must be at most 2000 characters').optional(),
        })
        .optional(),
      /**
       * The associations (e.g. Jira issue) to add in addition to the currently stored associations of the Security
       * Vulnerability.
       */
      addAssociations: z.array(z.unknown()).optional(),
      /** The associations (e.g. Jira issue) to remove from currently stored associations of the Security Vulnerability. */
      removeAssociations: z.array(z.unknown()).optional(),
      /**
       * An ISO-8601 Date-time string representing the last time the provider updated associations on this entity.
       *
       * Expected format is an RFC3339 formatted string.
       */
      associationsLastUpdated: z
        .string()
        .transform(s => new Date(s))
        .optional(),
      /**
       * A sequence number to compare when writing entity associations to the database.
       *
       * This can be any monotonically increasing number. A highly recommended implementation is to use epoch millis.
       *
       * This is an optional field. If it is not provided it will default to being equal to the corresponding entity's
       * `updateSequenceNumber`.
       *
       * Associations are written following a LastWriteWins strategy, association that are received with an
       * associationsUpdateSequenceNumber lower than what is currently stored will be ignored.
       */
      associationsUpdateSequenceNumber: z.number().optional(),
    }),
  ),
  /**
   * Information about the provider. This is useful for auditing, logging, debugging, and other internal uses.
   * Information in this property is not considered private, so it should not contain personally identifiable
   * information
   */
  providerMetadata: z
    .object({
      /** An optional name of the source of the vulnerabilities. */
      product: z.string().optional(),
    })
    .optional(),
});

export type SubmitVulnerabilities = z.input<typeof SubmitVulnerabilitiesSchema>;
