import { z } from 'zod';

export const GetStatusCategorySchema = z.object({
  /** The ID or key of the status category. */
  idOrKey: z.string(),
});

export type GetStatusCategory = z.input<typeof GetStatusCategorySchema>;
