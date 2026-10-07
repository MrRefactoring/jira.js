import { z } from 'zod';
import { FilterSchema } from '../models';

export const EditFilterSchema = z.object({
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** The filter id. */
  id: z.number(),
  body: FilterSchema.optional(),
});

export type EditFilter = z.input<typeof EditFilterSchema>;
