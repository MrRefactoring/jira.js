import { z } from 'zod';
import { StatusMappingSchema } from './statusMapping';

export const PublishDraftWorkflowSchemeParametersSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number().int(),
  /** Whether the request only performs a validation. */
  validateOnly: z.boolean().optional(),
  /** Mappings of statuses to new statuses for issue types. */
  statusMappings: z.array(StatusMappingSchema).optional(),
});

export type PublishDraftWorkflowSchemeParameters = z.infer<typeof PublishDraftWorkflowSchemeParametersSchema>;
