import { z } from 'zod';

/** The workflow scheme read request body. */
export const WorkflowSchemeReadRequestSchema = z.object({
  /** The list of project IDs to query. */
  projectIds: z.array(z.string()).optional(),
  /** The list of workflow scheme IDs to query. */
  workflowSchemeIds: z.array(z.string()).optional(),
});

export type WorkflowSchemeReadRequest = z.infer<typeof WorkflowSchemeReadRequestSchema>;
