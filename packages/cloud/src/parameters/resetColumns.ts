import { z } from 'zod';

export const ResetColumnsSchema = z.object({
  /** The ID of the filter. */
  id: z.number(),
});

export type ResetColumns = z.input<typeof ResetColumnsSchema>;
