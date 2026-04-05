import { z } from 'zod';
import { WorkflowStatusLayoutPayloadSchema } from '#/models/workflowStatusLayoutPayload';
import { ProjectCreateResourceIdentifierSchema } from '#/models/projectCreateResourceIdentifier';

/** The statuses to be used in the workflow */
export const WorkflowStatusPayloadSchema = z.object({
  layout: WorkflowStatusLayoutPayloadSchema.optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The properties of the workflow status. */
  properties: z.record(z.string(), z.any()).optional(),
});

export type WorkflowStatusPayload = z.infer<typeof WorkflowStatusPayloadSchema>;
