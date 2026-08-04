import { z } from 'zod';
import { apiObject } from '#/core';
/** The worflow. */

export const StatusWorkflowUsageWorkflowSchema = apiObject({
  /** The workflow ID. */
  id: z.string().optional(),
});

export type StatusWorkflowUsageWorkflow = z.infer<typeof StatusWorkflowUsageWorkflowSchema>;
