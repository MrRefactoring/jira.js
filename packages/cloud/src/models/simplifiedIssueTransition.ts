import { z } from 'zod';
import { IssueTransitionStatusSchema } from '#/models/issueTransitionStatus';

export const SimplifiedIssueTransitionSchema = z.object({
  to: IssueTransitionStatusSchema.optional(),
  /** The unique ID of the transition. */
  transitionId: z.number().optional(),
  /** The name of the transition. */
  transitionName: z.string().optional(),
});

export type SimplifiedIssueTransition = z.infer<typeof SimplifiedIssueTransitionSchema>;
