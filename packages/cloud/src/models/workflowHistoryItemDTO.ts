import { z } from 'zod';

/** A single entry in the WorkflowHistoryPage. */
export const WorkflowHistoryItemDTOSchema = z.object({
  /** Whether the version is an intermediate workflow state, sometimes created during workflow updates. */
  isIntermediate: z.boolean().optional(),
  workflowId: z.string().optional(),
  workflowVersion: z.number().optional(),
  /** The timestamp when this workflow version was created. */
  writtenAt: z.string().optional(),
});

export type WorkflowHistoryItemDTO = z.infer<typeof WorkflowHistoryItemDTOSchema>;
