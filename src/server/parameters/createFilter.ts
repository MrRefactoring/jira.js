import { z } from 'zod';
import { FilterSchema } from '../models';

export const CreateFilterSchema = z.object(FilterSchema.shape).extend({
  expand: z.union([z.string(), z.array(z.string())]).optional(),
});

export type CreateFilter = z.input<typeof CreateFilterSchema>;
