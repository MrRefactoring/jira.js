import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectUsagePageSchema } from './projectUsagePage';
/** Projects using the workflow scheme. */

export const WorkflowSchemeProjectUsageDTOSchema = apiObject({
  projects: ProjectUsagePageSchema.optional(),
  /** The workflow scheme ID. */
  workflowSchemeId: z.string().optional(),
});

export type WorkflowSchemeProjectUsageDTO = z.infer<typeof WorkflowSchemeProjectUsageDTOSchema>;
