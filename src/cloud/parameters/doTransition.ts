import { z } from 'zod';
import { IssueUpdateDetailsSchema } from '../models';

export const DoTransitionSchema = z.object({}).extend(IssueUpdateDetailsSchema.shape).extend({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type DoTransition = z.input<typeof DoTransitionSchema>;
