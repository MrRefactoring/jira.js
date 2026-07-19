import { z } from 'zod';

export const FindUserKeysByQuerySchema = z.object({
  /** The search query. */
  query: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResult: z.number().optional(),
});

export type FindUserKeysByQuery = z.input<typeof FindUserKeysByQuerySchema>;
