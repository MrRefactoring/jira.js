import { z } from 'zod';
import { IssueTransitionSchema } from './issueTransition';

/** List of issue transitions. */
export const TransitionsSchema = z.object({
  /** Expand options that include additional transitions details in the response. */
  expand: z.string().optional(),
  /** List of issue transitions. */
  transitions: z.array(IssueTransitionSchema).optional(),
});

export type Transitions = z.infer<typeof TransitionsSchema>;
