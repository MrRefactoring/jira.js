import { z } from 'zod';

/** Project ID details. */
export const WorkflowProjectIdScopeSchema = z.object({
  /** The ID of the project. */
  id: z.string().optional(),
});

export type WorkflowProjectIdScope = z.infer<typeof WorkflowProjectIdScopeSchema>;
