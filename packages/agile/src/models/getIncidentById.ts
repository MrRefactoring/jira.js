import { z } from 'zod';

/**
 * Data related to a specific incident in a specific container that the incident is present in. Must specify at least
 * one association to a component.*
 */
export const GetIncidentByIdSchema = z.object({
  /**
   * The IncidentData schema version used for this incident data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: z.enum(['1.0']),
  /** The identifier for the Incident. Must be unique for a given Provider. */
  id: z.string().max(255, 'id must be at most 255 characters'),
  /**
   * An ID used to apply an ordering to updates for this Incident in the case of out-of-order receipt of update
   * requests.
   *
   * This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the
   * Provider system, but other alternatives are valid (e.g. a Provider could store a counter against each Incident and
   * increment that on each update to Jira).
   *
   * Updates for a Incident that are received with an updateSqeuenceId lower than what is currently stored will be
   * ignored.
   */
  updateSequenceNumber: z.number(),
  /** The IDs of the Components impacted by this Incident. Must be unique for a given Provider. */
  affectedComponents: z.array(z.string()),
  /**
   * The human-readable summary for the Incident. Will be shown in the UI.
   *
   * If not provided, will use the ID for display.
   */
  summary: z.string().max(255, 'summary must be at most 255 characters'),
  /** A description of the issue in Markdown format. Will be shown in the UI and used when creating Jira Issues. */
  description: z.string().max(5000, 'description must be at most 5000 characters'),
  /**
   * A URL users can use to link to a summary view of this incident, if appropriate.
   *
   * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a
   * specific project, it might make sense to link the user to the incident in that project).
   */
  url: z.url().max(2000, 'url must be at most 2000 characters'),
  /**
   * The timestamp to present to the user that shows when the Incident was raised.
   *
   * Expected format is an RFC3339 formatted string.
   */
  createdDate: z.string().transform(s => new Date(s)),
  /**
   * The last-updated timestamp to present to the user the last time the Incident was updated.
   *
   * Expected format is an RFC3339 formatted string.
   */
  lastUpdated: z.string().transform(s => new Date(s)),
  /**
   * Severity information for a single Incident.
   *
   * This is the severity information that will be presented to the user on e.g. the Jira Incidents screen.
   */
  severity: z
    .object({
      /** The severity level of the Incident with P1 being the highest and P5 being the lowest */
      level: z.enum(['P1', 'P2', 'P3', 'P4', 'P5', 'unknown']),
    })
    .optional(),
  /** The current status of the Incident. */
  status: z.enum(['open', 'resolved', 'unknown']),
  /** The IDs of the Jira issues related to this Incident. Must be unique for a given Provider. */
  associations: z
    .array(
      z.object({
        /** The type of the association being made */
        associationType: z.enum(['issueIdOrKeys', 'serviceIdOrKeys', 'ati:cloud:compass:event-source']).optional(),
        values: z.array(z.string()).optional(),
      }),
    )
    .optional(),
});

export type GetIncidentById = z.infer<typeof GetIncidentByIdSchema>;
