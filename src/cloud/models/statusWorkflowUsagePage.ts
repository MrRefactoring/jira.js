import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusWorkflowUsageWorkflowSchema } from './statusWorkflowUsageWorkflow';
/** A page of workflows. */

export const StatusWorkflowUsagePageSchema = apiObject({
  /** Page token for the next page of issue type usages. */
  nextPageToken: z.string().nullish(),
  /** The list of statuses. */
  values: z.array(StatusWorkflowUsageWorkflowSchema).optional(),
});

export type StatusWorkflowUsagePage = z.infer<typeof StatusWorkflowUsagePageSchema>;
