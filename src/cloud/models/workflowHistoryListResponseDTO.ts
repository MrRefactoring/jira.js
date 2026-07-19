import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowHistoryItemDTOSchema } from './workflowHistoryItemDTO';
/** A list of workflow history entries. */

export const WorkflowHistoryListResponseDTOSchema = apiObject({
  entries: z.array(WorkflowHistoryItemDTOSchema).optional(),
});

export type WorkflowHistoryListResponseDTO = z.infer<typeof WorkflowHistoryListResponseDTOSchema>;
