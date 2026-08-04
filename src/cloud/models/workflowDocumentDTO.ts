import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowLayoutSchema } from './workflowLayout';
import { WorkflowScopeSchema } from './workflowScope';
import { WorkflowReferenceStatusSchema } from './workflowReferenceStatus';
import { WorkflowTransitionsSchema } from './workflowTransitions';
import { DocumentVersionSchema } from './documentVersion';
/** The workflow stored for the specified version. */

export const WorkflowDocumentDTOSchema = apiObject({
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
