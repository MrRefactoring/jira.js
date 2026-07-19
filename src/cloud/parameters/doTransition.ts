import { z } from 'zod';
import { IssueUpdateDetailsSchema } from '../models';

export const DoTransitionSchema = z
  .object({
    /** The ID or key of the issue. */
    issueIdOrKey: z.string(),
  })
  .extend(IssueUpdateDetailsSchema.shape);

export type DoTransition = z.input<typeof DoTransitionSchema>;
