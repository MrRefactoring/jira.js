import { z } from 'zod';
import { WorkflowScopeSchema } from '#/models/workflowScope';

/** The statuses stored for the specified version. */
export const WorkflowDocumentStatusDTOSchema = z.object({
  description: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  scope: WorkflowScopeSchema.optional(),
  statusCategory: z.string().optional(),
  statusReference: z.string().optional(),
});

export type WorkflowDocumentStatusDTO = z.infer<typeof WorkflowDocumentStatusDTOSchema>;
