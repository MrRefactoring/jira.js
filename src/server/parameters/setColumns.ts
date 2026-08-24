import { z } from 'zod';

export const SetColumnsSchema = z.object({
  /** The filter id. */
  id: z.string(),
  columns: z.array(z.string()).optional(),
});

export type SetColumns = z.input<typeof SetColumnsSchema>;
