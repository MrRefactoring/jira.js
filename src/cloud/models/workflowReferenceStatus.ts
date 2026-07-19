import { z } from 'zod';
import { apiObject } from '#/core';
import { ApprovalConfigurationSchema } from './approvalConfiguration';
import { WorkflowStatusLayoutSchema } from './workflowStatusLayout';
/** The statuses referenced in the workflow. */

export const WorkflowReferenceStatusSchema = apiObject({
  approvalConfiguration: ApprovalConfigurationSchema.optional(),
  /** Indicates if the status is deprecated. */
  deprecated: z.boolean().optional(),
  layout: WorkflowStatusLayoutSchema.optional(),
  /** The properties associated with the status. */
  properties: z.record(z.string(), z.any()).optional(),
  /** The reference of the status. */
  statusReference: z.string().optional(),
});

export type WorkflowReferenceStatus = z.infer<typeof WorkflowReferenceStatusSchema>;
