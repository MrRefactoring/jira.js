import { z } from 'zod';

export const GetFavouriteFiltersSchema = z.object({
  expand: z.union([z.string(), z.array(z.string())]).optional(),
});

export type GetFavouriteFilters = z.input<typeof GetFavouriteFiltersSchema>;
