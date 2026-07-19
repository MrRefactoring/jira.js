import { z } from 'zod';

export const GetIssueSchema = z.object({
  /** The ID or key of the requested issue. */
  issueIdOrKey: z.string(),
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields: z.array(z.record(z.string(), z.any())).optional(),
  /** A comma-separated list of the parameters to expand. */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** A boolean indicating whether the issue retrieved by this method should be added to the current user's issue history */
  updateHistory: z.boolean().optional(),
});

export type GetIssue = z.input<typeof GetIssueSchema>;
