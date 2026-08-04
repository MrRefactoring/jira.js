import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowScopeSchema } from './workflowScope';
/** The statuses stored for the specified version. */

export const WorkflowDocumentStatusDTOSchema = apiObject({
  description: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  scope: WorkflowScopeSchema.optional(),
  statusCategory: z.string().optional(),
  statusReference: z.string().optional(),
});

export type WorkflowDocumentStatusDTO = z.infer<typeof WorkflowDocumentStatusDTOSchema>;
