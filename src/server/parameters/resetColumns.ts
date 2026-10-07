import { z } from 'zod';

export const ResetColumnsSchema = z.object({
  /** The filter id. */
  id: z.number(),
});

export type ResetColumns = z.input<typeof ResetColumnsSchema>;
