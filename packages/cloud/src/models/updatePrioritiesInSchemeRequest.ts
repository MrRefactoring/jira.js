import { z } from 'zod';
import { PrioritySchemeChangesWithoutMappingsSchema } from '#/models/prioritySchemeChangesWithoutMappings';

/** Update priorities in a scheme */
export const UpdatePrioritiesInSchemeRequestSchema = z.object({
  add: PrioritySchemeChangesWithoutMappingsSchema.optional(),
  remove: PrioritySchemeChangesWithoutMappingsSchema.optional(),
});

export type UpdatePrioritiesInSchemeRequest = z.infer<typeof UpdatePrioritiesInSchemeRequestSchema>;
