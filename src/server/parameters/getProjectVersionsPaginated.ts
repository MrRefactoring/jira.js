import { z } from 'zod';

export const GetProjectVersionsPaginatedSchema = z.object({
  /** Parameters to expand */
  expand: z.string().optional(),
  /** Project id or project key */
  projectIdOrKey: z.string(),
  /** How many results on the page should be included. Defaults to 50 */
  maxResults: z.number().optional(),
  /** Ordering of the results */
  orderBy: z.string().optional(),
  /** The page offset, if not specified then defaults to 0 */
  startAt: z.number().optional(),
});

export type GetProjectVersionsPaginated = z.input<typeof GetProjectVersionsPaginatedSchema>;
