import { z } from 'zod';

export const GetPaginatedResolutionsSchema = z.object({
  /** The maximum number of statuses to return. */
  maxResults: z.number().optional(),
  /** The string that status names will be matched with. */
  query: z.string().optional(),
  /** The index of the first status to return. */
  startAt: z.number().optional(),
});

export type GetPaginatedResolutions = z.input<typeof GetPaginatedResolutionsSchema>;
