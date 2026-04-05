import { z } from 'zod';

/** The statuses the transition can start from, and the mapping of ports between the statuses. */
export const WorkflowTransitionLinksSchema = z.object({
  /** The port that the transition starts from. */
  fromPort: z.number().nullable().optional(),
  /** The status that the transition starts from. */
  fromStatusReference: z.string().nullable().optional(),
  /** The port that the transition goes to. */
  toPort: z.number().nullable().optional(),
});

export type WorkflowTransitionLinks = z.infer<typeof WorkflowTransitionLinksSchema>;
