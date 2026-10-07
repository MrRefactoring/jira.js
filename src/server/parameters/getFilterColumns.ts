import { z } from 'zod';

export const GetFilterColumnsSchema = z.object({
  /** The filter id. */
  id: z.number(),
});

export type GetFilterColumns = z.input<typeof GetFilterColumnsSchema>;
