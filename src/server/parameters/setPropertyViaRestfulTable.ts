import { z } from 'zod';

export const SetPropertyViaRestfulTableSchema = z.object({
  /** A String containing the property key. */
  id: z.string(),
});

export type SetPropertyViaRestfulTable = z.input<typeof SetPropertyViaRestfulTableSchema>;
