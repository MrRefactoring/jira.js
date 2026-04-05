import { z } from 'zod';

export const GetColumnsSchema = z.object({
  /** The ID of the filter. */
  id: z.number(),
});

export type GetColumns = z.input<typeof GetColumnsSchema>;
