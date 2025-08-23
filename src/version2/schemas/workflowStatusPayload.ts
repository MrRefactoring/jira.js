import { z } from 'zod';
import { WorkflowStatusLayoutPayloadSchema } from './workflowStatusLayoutPayload';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The statuses to be used in the workflow */
export const WorkflowStatusPayloadSchema = z.object({
  layout: WorkflowStatusLayoutPayloadSchema.optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The properties of the workflow status. */
  properties: z.object({}).optional(),
});

export type WorkflowStatusPayload = z.infer<typeof WorkflowStatusPayloadSchema>;
