import { z } from 'zod';
import { apiObject } from '#/core';
import { ApprovalConfigurationSchema } from './approvalConfiguration';
import { WorkflowLayoutSchema } from './workflowLayout';
/** The statuses associated with this workflow. */

export const StatusLayoutUpdateSchema = apiObject({
  approvalConfiguration: ApprovalConfigurationSchema.optional(),
  layout: WorkflowLayoutSchema.optional(),
  /** The properties for this status layout. */
  properties: z.record(z.string(), z.any()),
  /** A unique ID which the status will use to refer to this layout configuration. */
  statusReference: z.string(),
});

export type StatusLayoutUpdate = z.infer<typeof StatusLayoutUpdateSchema>;
