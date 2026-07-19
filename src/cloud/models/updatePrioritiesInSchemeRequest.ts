import type { z } from 'zod';
import { apiObject } from '#/core';
import { PrioritySchemeChangesWithoutMappingsSchema } from './prioritySchemeChangesWithoutMappings';
/** Update priorities in a scheme */

export const UpdatePrioritiesInSchemeRequestSchema = apiObject({
  add: PrioritySchemeChangesWithoutMappingsSchema.optional(),
  remove: PrioritySchemeChangesWithoutMappingsSchema.optional(),
});

export type UpdatePrioritiesInSchemeRequest = z.infer<typeof UpdatePrioritiesInSchemeRequestSchema>;
