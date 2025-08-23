import { z } from 'zod';
import { StatusWorkflowUsageWorkflowSchema } from './statusWorkflowUsageWorkflow';

/** A page of workflows. */
export const StatusWorkflowUsagePageSchema = z.object({
  /** Page token for the next page of issue type usages. */
  nextPageToken: z.string().optional(),
  /** The list of statuses. */
  values: z.array(StatusWorkflowUsageWorkflowSchema).optional(),
});

export type StatusWorkflowUsagePage = z.infer<typeof StatusWorkflowUsagePageSchema>;
