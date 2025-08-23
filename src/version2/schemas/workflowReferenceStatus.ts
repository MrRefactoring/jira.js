import { z } from 'zod';
import { ApprovalConfigurationSchema } from './approvalConfiguration';
import { WorkflowStatusLayoutSchema } from './workflowStatusLayout';

/** The statuses referenced in the workflow. */
export const WorkflowReferenceStatusSchema = z.object({
  approvalConfiguration: ApprovalConfigurationSchema.optional(),
  /** Indicates if the status is deprecated. */
  deprecated: z.boolean().optional(),
  layout: WorkflowStatusLayoutSchema.optional(),
  /** The properties associated with the status. */
  properties: z.object({}).optional(),
  /** The reference of the status. */
  statusReference: z.string().optional(),
});

export type WorkflowReferenceStatus = z.infer<typeof WorkflowReferenceStatusSchema>;
