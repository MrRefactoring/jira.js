import { z } from 'zod';
import { apiObject } from '#/core';
/** The list of required status mappings by workflow. */

export const RequiredMappingByWorkflowsSchema = apiObject({
  /** The ID of the source workflow. */
  sourceWorkflowId: z.string().optional(),
  /** The status IDs requiring mapping. */
  statusIds: z.array(z.string()).optional(),
  /** The ID of the target workflow. */
  targetWorkflowId: z.string().optional(),
});

export type RequiredMappingByWorkflows = z.infer<typeof RequiredMappingByWorkflowsSchema>;
