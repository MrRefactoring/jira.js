import { z } from 'zod';
import { apiObject } from '#/core';
/** A workflow transition. */

export const WorkflowTransitionSchema = apiObject({
  /** The transition ID. */
  id: z.number(),
  /** The transition name. */
  name: z.string(),
});

export type WorkflowTransition = z.infer<typeof WorkflowTransitionSchema>;
