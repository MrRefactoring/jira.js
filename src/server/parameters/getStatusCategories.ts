import { z } from 'zod';

export const GetStatusCategoriesSchema = z.object({
  /** A Request */
  request: z.string().optional(),
  /** A UriInfo */
  uriInfo: z.string().optional(),
});

export type GetStatusCategories = z.input<typeof GetStatusCategoriesSchema>;
