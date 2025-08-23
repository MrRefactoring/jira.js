import { z } from 'zod';

export const DeleteWorklogParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  id: z.string(),
  /** Whether users watching the issue are notified by email. */
  notifyUsers: z.boolean().optional(),
  /**
   * Defines how to update the issue's time estimate, the options are:
   *
   * - `new` Sets the estimate to a specific value, defined in `newEstimate`.
   * - `leave` Leaves the estimate unchanged.
   * - `manual` Increases the estimate by amount specified in `increaseBy`.
   * - `auto` Reduces the estimate by the value of `timeSpent` in the worklog.
   */
  adjustEstimate: z.enum(['new', 'leave', 'manual', 'auto']).optional(),
  /**
   * The value to set as the issue's remaining time estimate, as days (#d), hours (#h), or minutes (#m or #). For
   * example, _2d_. Required when `adjustEstimate` is `new`.
   */
  newEstimate: z.string().optional(),
  /**
   * The amount to increase the issue's remaining estimate by, as days (#d), hours (#h), or minutes (#m or #). For
   * example, _2d_. Required when `adjustEstimate` is `manual`.
   */
  increaseBy: z.string().optional(),
  /**
   * Whether the work log entry should be added to the issue even if the issue is not editable, because
   * jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with
   * admin permission can use this flag.
   */
  overrideEditableFlag: z.boolean().optional(),
});

export type DeleteWorklogParameters = z.infer<typeof DeleteWorklogParametersSchema>;
