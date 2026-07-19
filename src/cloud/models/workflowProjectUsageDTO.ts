import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectUsagePageSchema } from './projectUsagePage';
/** Projects using the workflow. */

export const WorkflowProjectUsageDTOSchema = apiObject({
  projects: ProjectUsagePageSchema.optional(),
  /** The workflow ID. */
  workflowId: z.string().optional(),
});

export type WorkflowProjectUsageDTO = z.infer<typeof WorkflowProjectUsageDTOSchema>;
