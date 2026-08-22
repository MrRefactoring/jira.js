import { z } from 'zod';

export const GetPrioritiesPaginatedSchema = z.object({
  /** How many results on the page should be included. Defaults to 100 */
  maxResults: z.number().optional(),
  /** Query that should match priority name or its translation */
  query: z.string().optional(),
  /** The list of project ids to filter priorities */
  projectIds: z.array(z.number()).optional(),
  /** The page offset, if not specified then defaults to 0 */
  startAt: z.number().optional(),
});

export type GetPrioritiesPaginated = z.input<typeof GetPrioritiesPaginatedSchema>;
