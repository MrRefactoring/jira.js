import { z } from 'zod';
import { ColumnRequestBodySchema } from '../models';

export const SetColumnsSchema = z.object(ColumnRequestBodySchema.shape).extend({
  /** The ID of the filter. */
  id: z.number(),
});

export type SetColumns = z.input<typeof SetColumnsSchema>;
