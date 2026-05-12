import { z } from 'zod';

/** Details about the server Jira is running on. */
export const WorkflowTransitionPropertySchema = z.object({
  /** The ID of the transition property. */
  id: z.string().optional(),
  /** The key of the transition property. Also known as the name of the transition property. */
  key: z.string().optional(),
  /** The value of the transition property. */
  value: z.string(),
});

export type WorkflowTransitionProperty = z.infer<typeof WorkflowTransitionPropertySchema>;
