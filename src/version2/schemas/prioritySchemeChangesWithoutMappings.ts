import { z } from 'zod';

export const PrioritySchemeChangesWithoutMappingsSchema = z.object({
  /** Affected entity ids. */
  ids: z.array(z.number().int()),
});

export type PrioritySchemeChangesWithoutMappings = z.infer<typeof PrioritySchemeChangesWithoutMappingsSchema>;
