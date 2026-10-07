import { z } from 'zod';

export const GetAgileIssueSchema = z.object({
  /** A comma-separated list of the parameters to expand. */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** The Id or key of the requested issue. */
  issueIdOrKey: z.string(),
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields: z.union([z.string(), z.array(z.string())]).optional(),
  /**
   * A boolean indicating whether the issue retrieved by this method should be added to the current user's issue
   * history.
   */
  updateHistory: z.boolean().optional(),
});

export type GetAgileIssue = z.input<typeof GetAgileIssueSchema>;
