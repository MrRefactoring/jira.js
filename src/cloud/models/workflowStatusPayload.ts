import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowStatusLayoutPayloadSchema } from './workflowStatusLayoutPayload';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
/** The statuses to be used in the workflow */

export const WorkflowStatusPayloadSchema = apiObject({
  layout: WorkflowStatusLayoutPayloadSchema.optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The properties of the workflow status. */
  properties: z.record(z.string(), z.any()).optional(),
});

export type WorkflowStatusPayload = z.infer<typeof WorkflowStatusPayloadSchema>;
