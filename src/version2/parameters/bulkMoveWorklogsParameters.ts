import { z } from 'zod';

export const BulkMoveWorklogsParametersSchema = z.object({
  issueIdOrKey: z.string(),
  /**
   * Defines how to update the issues' time estimate, the options are:
   *
   * - `leave` Leaves the estimate unchanged.
   * - `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being moved in the source
   *   issue, and increases it in the destination issue.
   */
  adjustEstimate: z.enum(['leave', 'auto']).optional(),
  /**
   * Whether the work log entry should be moved to and from the issues even if the issues are not editable, because
   * jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with
   * admin permission can use this flag.
   */
  overrideEditableFlag: z.boolean().optional(),
  /** A list of worklog IDs. */
  ids: z.array(z.number().int()).optional(),
  /** The issue id or key of the destination issue */
  issueIdOrKey: z.string().optional(),
});

export type BulkMoveWorklogsParameters = z.infer<typeof BulkMoveWorklogsParametersSchema>;
