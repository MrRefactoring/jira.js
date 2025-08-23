import { z } from 'zod';

export const GetPrioritiesByPrioritySchemeParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /** The priority scheme ID. */
  schemeId: z.string(),
});

export type GetPrioritiesByPrioritySchemeParameters = z.infer<typeof GetPrioritiesByPrioritySchemeParametersSchema>;
