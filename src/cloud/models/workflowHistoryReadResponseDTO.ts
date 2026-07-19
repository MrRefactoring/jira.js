import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowDocumentStatusDTOSchema } from './workflowDocumentStatusDTO';
import { WorkflowDocumentDTOSchema } from './workflowDocumentDTO';
/** The specified workflow version read from history. */

export const WorkflowHistoryReadResponseDTOSchema = apiObject({
  statuses: z.array(WorkflowDocumentStatusDTOSchema).optional(),
  workflows: z.array(WorkflowDocumentDTOSchema).optional(),
});

export type WorkflowHistoryReadResponseDTO = z.infer<typeof WorkflowHistoryReadResponseDTOSchema>;
