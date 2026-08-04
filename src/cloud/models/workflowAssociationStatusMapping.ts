import { z } from 'zod';
import { apiObject } from '#/core';

export const WorkflowAssociationStatusMappingSchema = apiObject({
  newStatusId: z.string().optional(),
  oldStatusId: z.string().optional(),
});

export type WorkflowAssociationStatusMapping = z.infer<typeof WorkflowAssociationStatusMappingSchema>;
