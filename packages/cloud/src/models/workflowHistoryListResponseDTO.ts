import { z } from 'zod';
import { WorkflowHistoryItemDTOSchema } from '#/models/workflowHistoryItemDTO';

/** A list of workflow history entries. */
export const WorkflowHistoryListResponseDTOSchema = z.object({
  entries: z.array(WorkflowHistoryItemDTOSchema).optional(),
});

export type WorkflowHistoryListResponseDTO = z.infer<typeof WorkflowHistoryListResponseDTOSchema>;
