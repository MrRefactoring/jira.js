import { z } from 'zod';
import { apiObject } from '#/core';
/** The statuses the transition can start from, and the mapping of ports between the statuses. */

export const WorkflowTransitionLinksSchema = apiObject({
  /** The port that the transition starts from. */
  fromPort: z.number().nullish(),
  /** The status that the transition starts from. */
  fromStatusReference: z.string().nullish(),
  /** The port that the transition goes to. */
  toPort: z.number().nullish(),
});

export type WorkflowTransitionLinks = z.infer<typeof WorkflowTransitionLinksSchema>;
