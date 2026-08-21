import { z } from 'zod';
import { ApplicationPropertyValueSchema } from '../models';

export const SetPropertyViaRestfulTableSchema = z.object({
  /** A String containing the property key. */
  id: z.string(),
  body: ApplicationPropertyValueSchema,
});

export type SetPropertyViaRestfulTable = z.input<typeof SetPropertyViaRestfulTableSchema>;
