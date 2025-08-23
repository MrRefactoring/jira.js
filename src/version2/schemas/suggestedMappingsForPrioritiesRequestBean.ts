import { z } from 'zod';

/** Details of changes to a priority scheme's priorities that require suggested priority mappings. */
export const SuggestedMappingsForPrioritiesRequestBeanSchema = z.object({
  /** The ids of priorities being removed from the scheme. */
  add: z.array(z.number().int()).optional(),
  /** The ids of priorities being removed from the scheme. */
  remove: z.array(z.number().int()).optional(),
});

export type SuggestedMappingsForPrioritiesRequestBean = z.infer<typeof SuggestedMappingsForPrioritiesRequestBeanSchema>;
