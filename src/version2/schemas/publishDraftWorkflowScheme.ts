import { z } from 'zod';
import { StatusMappingSchema } from './statusMapping';

/** Details about the status mappings for publishing a draft workflow scheme. */
export const PublishDraftWorkflowSchemeSchema = z.object({
  /** Mappings of statuses to new statuses for issue types. */
  statusMappings: z.array(StatusMappingSchema).optional(),
});

export type PublishDraftWorkflowScheme = z.infer<typeof PublishDraftWorkflowSchemeSchema>;
