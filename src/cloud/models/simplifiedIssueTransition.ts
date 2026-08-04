import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTransitionStatusSchema } from './issueTransitionStatus';

export const SimplifiedIssueTransitionSchema = apiObject({
  to: IssueTransitionStatusSchema.optional(),
  /** The unique ID of the transition. */
  transitionId: z.number().optional(),
  /** The name of the transition. */
  transitionName: z.string().optional(),
});

export type SimplifiedIssueTransition = z.infer<typeof SimplifiedIssueTransitionSchema>;
