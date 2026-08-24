import { z } from 'zod';

export const GetStatusCategorySchema = z.object({
  /** A numeric StatusCategory id or a status category key */
  idOrKey: z.string(),
});

export type GetStatusCategory = z.input<typeof GetStatusCategorySchema>;
