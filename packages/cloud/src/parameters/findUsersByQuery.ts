import { z } from 'zod';

export const FindUsersByQuerySchema = z.object({
  /** The search query. */
  query: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type FindUsersByQuery = z.input<typeof FindUsersByQuerySchema>;
