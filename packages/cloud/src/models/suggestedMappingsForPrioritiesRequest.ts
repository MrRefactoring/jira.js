import { z } from 'zod';

/** Details of changes to a priority scheme's priorities that require suggested priority mappings. */
export const SuggestedMappingsForPrioritiesRequestSchema = z.object({
  /** The ids of priorities being removed from the scheme. */
  add: z.array(z.number()).optional(),
  /** The ids of priorities being removed from the scheme. */
  remove: z.array(z.number()).optional(),
});

export type SuggestedMappingsForPrioritiesRequest = z.infer<typeof SuggestedMappingsForPrioritiesRequestSchema>;
