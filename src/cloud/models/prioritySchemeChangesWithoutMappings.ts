import { z } from 'zod';
import { apiObject } from '#/core';

export const PrioritySchemeChangesWithoutMappingsSchema = apiObject({
  /** Affected entity ids. */
  ids: z.array(z.number()),
});

export type PrioritySchemeChangesWithoutMappings = z.infer<typeof PrioritySchemeChangesWithoutMappingsSchema>;
