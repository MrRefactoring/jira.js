import { z } from 'zod';

export const DeleteWorklogSchema = z.object({
  /** Required when 'new' is selected for adjustEstimate. e.g. "2d" */
  newEstimate: z.string().optional(),
  /**
   * Allows you to provide specific instructions to update the remaining time estimate of the issue. Valid values are:
   * new, leave, manual, auto
   */
  adjustEstimate: z.string().optional(),
  /** A string containing the issue id or key the worklog belongs to */
  issueIdOrKey: z.string(),
  /** Id of the worklog to be deleted */
  id: z.string(),
  /** Required when 'manual' is selected for adjustEstimate. e.g. "2d" */
  increaseBy: z.string().optional(),
});

export type DeleteWorklog = z.input<typeof DeleteWorklogSchema>;
