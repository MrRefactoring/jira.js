import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTransitionSchema } from './issueTransition';
/** List of issue transitions. */

export const TransitionsSchema = apiObject({
  /** Expand options that include additional transitions details in the response. */
  expand: z.string().optional(),
  /** List of issue transitions. */
  transitions: z.array(IssueTransitionSchema).optional(),
});

export type Transitions = z.infer<typeof TransitionsSchema>;
