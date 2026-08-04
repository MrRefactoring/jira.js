import type { z } from 'zod';
import { apiObject } from '#/core';
import { PrioritySchemeChangesWithoutMappingsSchema } from './prioritySchemeChangesWithoutMappings';
/** Update projects in a scheme */

export const UpdateProjectsInSchemeRequestSchema = apiObject({
  add: PrioritySchemeChangesWithoutMappingsSchema.optional(),
  remove: PrioritySchemeChangesWithoutMappingsSchema.optional(),
});

export type UpdateProjectsInSchemeRequest = z.infer<typeof UpdateProjectsInSchemeRequestSchema>;
