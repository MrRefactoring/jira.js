import { z } from 'zod';
import { WorkflowSchemeUsagePageSchema } from './workflowSchemeUsagePage';

/** Workflow schemes using the workflow. */
export const WorkflowSchemeUsageDTOSchema = z.object({
  /** The workflow ID. */
  workflowId: z.string().optional(),
  workflowSchemes: WorkflowSchemeUsagePageSchema.optional(),
});

export type WorkflowSchemeUsageDTO = z.infer<typeof WorkflowSchemeUsageDTOSchema>;
