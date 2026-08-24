import { z } from 'zod';
import { WorklogSchema } from '../models';

export const UpdateWorklogSchema = z.object({
  /** Required when 'new' is selected for adjustEstimate */
  newEstimate: z.string().optional(),
  /**
   * Allows you to provide specific instructions to update the remaining time estimate of the issue. Valid values are:
   * new, leave, auto
   */
  adjustEstimate: z.string().optional(),
  /** A string containing the issue id or key the worklog belongs to */
  issueIdOrKey: z.string(),
  /** Id of the worklog to be updated */
  id: z.string(),
  body: WorklogSchema.optional(),
});

export type UpdateWorklog = z.input<typeof UpdateWorklogSchema>;
