import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusMappingSchema } from './statusMapping';

export const WorkflowSchemeMigrationRequestSchema = apiObject({
  schemeId: z.number().optional(),
  statusMappings: z.array(StatusMappingSchema).optional(),
});

export type WorkflowSchemeMigrationRequest = z.infer<typeof WorkflowSchemeMigrationRequestSchema>;
