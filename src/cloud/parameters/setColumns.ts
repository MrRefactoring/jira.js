import { z } from 'zod';
import { ColumnRequestBodySchema } from '../models';

export const SetColumnsSchema = z
  .object({
    /** The ID of the filter. */
    id: z.number(),
  })
  .extend(ColumnRequestBodySchema.shape);

export type SetColumns = z.input<typeof SetColumnsSchema>;
