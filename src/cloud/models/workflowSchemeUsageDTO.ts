import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowSchemeUsagePageSchema } from './workflowSchemeUsagePage';
/** Workflow schemes using the workflow. */

export const WorkflowSchemeUsageDTOSchema = apiObject({
  /** The workflow ID. */
  workflowId: z.string().optional(),
  workflowSchemes: WorkflowSchemeUsagePageSchema.optional(),
});

export type WorkflowSchemeUsageDTO = z.infer<typeof WorkflowSchemeUsageDTOSchema>;
