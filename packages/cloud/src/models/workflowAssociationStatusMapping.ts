import { z } from 'zod';

export const WorkflowAssociationStatusMappingSchema = z.object({
  newStatusId: z.string().optional(),
  oldStatusId: z.string().optional(),
});

export type WorkflowAssociationStatusMapping = z.infer<typeof WorkflowAssociationStatusMappingSchema>;
