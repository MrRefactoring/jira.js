import { z } from 'zod';

/** The classic workflow identifiers. */
export const WorkflowIDsSchema = z.object({
  /** The entity ID of the workflow. */
  entityId: z.string().optional(),
  /** The name of the workflow. */
  name: z.string(),
});

export type WorkflowIDs = z.infer<typeof WorkflowIDsSchema>;
