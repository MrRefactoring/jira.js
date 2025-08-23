import { z } from 'zod';

/** The list of status mappings. */
export const WorkflowAssociationStatusMappingSchema = z.object({
  /** The ID of the status in the new workflow. */
  newStatusId: z.string(),
  /** The ID of the status in the old workflow that isn't present in the new workflow. */
  oldStatusId: z.string(),
});

export type WorkflowAssociationStatusMapping = z.infer<typeof WorkflowAssociationStatusMappingSchema>;
