import { z } from 'zod';

/** Data related to a specific post-incident review. Must specify at least one association to an incident.* */
export const GetReviewByIdSchema = z.object({
  /**
   * The PostIncidentReviewData schema version used for this post-incident review data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: z.enum(['1.0']),
  /** The identifier for the Review. Must be unique for a given Provider. */
  id: z.string().max(255, 'id must be at most 255 characters'),
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
  updateSequenceNumber: z.number(),
  /** The IDs of the Incidents covered by this Review. Must be unique for a given Provider. */
  reviews: z.array(z.string()),
  /**
   * The human-readable summary for the Post-Incident Review. Will be shown in the UI.
   *
   * If not provided, will use the ID for display.
   */
  summary: z.string().max(255, 'summary must be at most 255 characters'),
  /** A description of the review in Markdown format. Will be shown in the UI and used when creating Jira Issues. */
  description: z.string().max(5000, 'description must be at most 5000 characters'),
  /**
   * A URL users can use to link to a summary view of this review, if appropriate.
   *
   * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from a
   * specific project, it might make sense to link the user to the review in that project).
   */
  url: z.url().max(2000, 'url must be at most 2000 characters'),
  /**
   * The timestamp to present to the user that shows when the Review was raised.
   *
   * Expected format is an RFC3339 formatted string.
   */
  createdDate: z.string().transform(s => new Date(s)),
  /**
   * The last-updated timestamp to present to the user the last time the Review was updated.
   *
   * Expected format is an RFC3339 formatted string.
   */
  lastUpdated: z.string().transform(s => new Date(s)),
  /** The current status of the Post-Incident Review. */
  status: z.enum(['in progress', 'outstanding actions', 'completed', 'unknown']),
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

export type GetReviewById = z.infer<typeof GetReviewByIdSchema>;
