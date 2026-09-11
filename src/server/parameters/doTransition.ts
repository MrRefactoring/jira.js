import { z } from 'zod';
import { IssueUpdateSchema } from '../models';

export const DoTransitionSchema = z.object(IssueUpdateSchema.shape).extend({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type DoTransition = z.input<typeof DoTransitionSchema>;
