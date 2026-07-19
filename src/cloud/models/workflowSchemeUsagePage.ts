import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowSchemeUsageSchema } from './workflowSchemeUsage';
/** A page of workflow schemes. */

export const WorkflowSchemeUsagePageSchema = apiObject({
  /** Token for the next page of issue type usages. */
  nextPageToken: z.string().optional(),
  /** The list of workflow schemes. */
  values: z.array(WorkflowSchemeUsageSchema).optional(),
});

export type WorkflowSchemeUsagePage = z.infer<typeof WorkflowSchemeUsagePageSchema>;
