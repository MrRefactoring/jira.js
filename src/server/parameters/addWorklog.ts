import { z } from 'zod';
import { WorklogSchema } from '../models';

export const AddWorklogSchema = z.object(WorklogSchema.shape).extend({
  /** Required when 'new' is selected for adjustEstimate. e.g. "2d" */
  newEstimate: z.string().optional(),
  /**
   * Allows you to provide specific instructions to update the remaining time estimate of the issue. Valid values are:
   * new, leave, manual, auto
   */
  adjustEstimate: z.string().optional(),
  /** Required when 'manual' is selected for adjustEstimate. e.g. "2d" */
  reduceBy: z.string().optional(),
  /** A string containing the issue id or key the worklog will be added to */
  issueIdOrKey: z.string(),
});

export type AddWorklog = z.input<typeof AddWorklogSchema>;
