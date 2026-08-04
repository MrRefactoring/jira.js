import { z } from 'zod';
import { apiObject } from '#/core';
import { ApprovalConfigurationPreviewSchema } from './approvalConfigurationPreview';
import { WorkflowPreviewLayoutSchema } from './workflowPreviewLayout';
/** Details about a workflow status in preview context. */

export const WorkflowPreviewStatusSchema = apiObject({
  approvalConfiguration: ApprovalConfigurationPreviewSchema.optional(),
  /** Whether the status is deprecated. */
  deprecated: z.boolean().optional(),
  layout: WorkflowPreviewLayoutSchema.optional(),
  /** The reference of the status. */
  statusReference: z.string().optional(),
});

export type WorkflowPreviewStatus = z.infer<typeof WorkflowPreviewStatusSchema>;
