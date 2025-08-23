import { z } from 'zod';

export const BulkDeleteWorklogsParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * Defines how to update the issue's time estimate, the options are:
   *
   * - `leave` Leaves the estimate unchanged.
   * - `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being deleted.
   */
  adjustEstimate: z.enum(['leave', 'auto']).optional(),
  /**
   * Whether the work log entries should be removed to the issue even if the issue is not editable, because
   * jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with
   * admin permission can use this flag.
   */
  overrideEditableFlag: z.boolean().optional(),
  /** A list of worklog IDs. */
  ids: z.array(z.number().int()),
});

export type BulkDeleteWorklogsParameters = z.infer<typeof BulkDeleteWorklogsParametersSchema>;
