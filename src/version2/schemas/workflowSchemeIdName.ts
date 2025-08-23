import { z } from 'zod';

/** The ID and the name of the workflow scheme. */
export const WorkflowSchemeIdNameSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.string(),
  /** The name of the workflow scheme. */
  name: z.string(),
});

export type WorkflowSchemeIdName = z.infer<typeof WorkflowSchemeIdNameSchema>;
