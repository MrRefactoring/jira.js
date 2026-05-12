import { z } from 'zod';
import { WorkflowDocumentStatusDTOSchema } from '#/models/workflowDocumentStatusDTO';
import { WorkflowDocumentDTOSchema } from '#/models/workflowDocumentDTO';

/** The specified workflow version read from history. */
export const WorkflowHistoryReadResponseDTOSchema = z.object({
  statuses: z.array(WorkflowDocumentStatusDTOSchema).optional(),
  workflows: z.array(WorkflowDocumentDTOSchema).optional(),
});

export type WorkflowHistoryReadResponseDTO = z.infer<typeof WorkflowHistoryReadResponseDTOSchema>;
