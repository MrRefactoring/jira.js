import { z } from 'zod';

/** Details of changes to a priority scheme that require suggested priority mappings. */
export const SuggestedMappingsRequestBeanSchema = z.object({
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().int().optional(),
  /** The priority changes in the scheme. */
  priorities: z.unknown().optional(),
  /** The project changes in the scheme. */
  projects: z.unknown().optional(),
  /** The id of the priority scheme. */
  schemeId: z.number().int().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().int().optional(),
});

export type SuggestedMappingsRequestBean = z.infer<typeof SuggestedMappingsRequestBeanSchema>;
