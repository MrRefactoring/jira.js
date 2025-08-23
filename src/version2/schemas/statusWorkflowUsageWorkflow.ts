import { z } from 'zod';

/** The worflow. */
export const StatusWorkflowUsageWorkflowSchema = z.object({
  /** The workflow ID. */
  id: z.string().optional(),
});

export type StatusWorkflowUsageWorkflow = z.infer<typeof StatusWorkflowUsageWorkflowSchema>;
