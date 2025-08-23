import { z } from 'zod';
import { ProjectUsagePageSchema } from './projectUsagePage';

/** Projects using the workflow. */
export const WorkflowProjectUsageDTOSchema = z.object({
  projects: ProjectUsagePageSchema.optional(),
  /** The workflow ID. */
  workflowId: z.string().optional(),
});

export type WorkflowProjectUsageDTO = z.infer<typeof WorkflowProjectUsageDTOSchema>;
