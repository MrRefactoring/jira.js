import { z } from 'zod';
import { SimpleApplicationPropertySchema } from '../models';

export const SetApplicationPropertySchema = z.object({
  /** The key of the application property to update. */
  id: z.string(),
  body: SimpleApplicationPropertySchema,
});

export type SetApplicationProperty = z.input<typeof SetApplicationPropertySchema>;
