import { z } from 'zod';

/** Operations allowed on a workflow */
export const WorkflowOperationsSchema = z.object({
  /** Whether the workflow can be deleted. */
  canDelete: z.boolean(),
  /** Whether the workflow can be updated. */
  canEdit: z.boolean(),
});

export type WorkflowOperations = z.infer<typeof WorkflowOperationsSchema>;
