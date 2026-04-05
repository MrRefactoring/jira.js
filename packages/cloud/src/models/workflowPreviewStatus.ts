import { z } from 'zod';
import { ApprovalConfigurationPreviewSchema } from '#/models/approvalConfigurationPreview';
import { WorkflowPreviewLayoutSchema } from '#/models/workflowPreviewLayout';

/** Details about a workflow status in preview context. */
export const WorkflowPreviewStatusSchema = z.object({
  approvalConfiguration: ApprovalConfigurationPreviewSchema.optional(),
  /** Whether the status is deprecated. */
  deprecated: z.boolean().optional(),
  layout: WorkflowPreviewLayoutSchema.optional(),
  /** The reference of the status. */
  statusReference: z.string().optional(),
});

export type WorkflowPreviewStatus = z.infer<typeof WorkflowPreviewStatusSchema>;
