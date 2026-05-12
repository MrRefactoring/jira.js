import { z } from 'zod';
import { WorkflowLayoutSchema } from '#/models/workflowLayout';
import { WorkflowScopeSchema } from '#/models/workflowScope';
import { WorkflowReferenceStatusSchema } from '#/models/workflowReferenceStatus';
import { WorkflowTransitionsSchema } from '#/models/workflowTransitions';
import { DocumentVersionSchema } from '#/models/documentVersion';

/** The workflow stored for the specified version. */
export const WorkflowDocumentDTOSchema = z.object({
  created: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  lastUpdateAuthorAAID: z.string().optional(),
  loopedTransitionContainerLayout: WorkflowLayoutSchema.optional(),
  name: z.string().optional(),
  scope: WorkflowScopeSchema.optional(),
  startPointLayout: WorkflowLayoutSchema.optional(),
  statuses: z.array(WorkflowReferenceStatusSchema).optional(),
  transitions: z.array(WorkflowTransitionsSchema).optional(),
  updated: z.string().optional(),
  version: DocumentVersionSchema.optional(),
});

export type WorkflowDocumentDTO = z.infer<typeof WorkflowDocumentDTOSchema>;
