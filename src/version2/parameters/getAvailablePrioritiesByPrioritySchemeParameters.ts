import { z } from 'zod';

export const GetAvailablePrioritiesByPrioritySchemeParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /** The string to query priorities on by name. */
  query: z.string().optional(),
  /** The priority scheme ID. */
  schemeId: z.string(),
  /** A list of priority IDs to exclude from the results. */
  exclude: z.array(z.string()).optional(),
});

export type GetAvailablePrioritiesByPrioritySchemeParameters = z.infer<
  typeof GetAvailablePrioritiesByPrioritySchemeParametersSchema
>;
