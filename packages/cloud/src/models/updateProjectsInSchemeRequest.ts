import { z } from 'zod';
import { PrioritySchemeChangesWithoutMappingsSchema } from '#/models/prioritySchemeChangesWithoutMappings';

/** Update projects in a scheme */
export const UpdateProjectsInSchemeRequestSchema = z.object({
  add: PrioritySchemeChangesWithoutMappingsSchema.optional(),
  remove: PrioritySchemeChangesWithoutMappingsSchema.optional(),
});

export type UpdateProjectsInSchemeRequest = z.infer<typeof UpdateProjectsInSchemeRequestSchema>;
