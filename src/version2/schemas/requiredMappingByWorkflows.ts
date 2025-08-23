import { z } from 'zod';

/** The list of required status mappings by workflow. */
export const RequiredMappingByWorkflowsSchema = z.object({
  /** The ID of the source workflow. */
  sourceWorkflowId: z.string().optional(),
  /** The status IDs requiring mapping. */
  statusIds: z.array(z.string()).optional(),
  /** The ID of the target workflow. */
  targetWorkflowId: z.string().optional(),
});

export type RequiredMappingByWorkflows = z.infer<typeof RequiredMappingByWorkflowsSchema>;
