import { z } from 'zod';

export const GetFilterColumnsSchema = z.object({
  /** The filter id. */
  id: z.string(),
});

export type GetFilterColumns = z.input<typeof GetFilterColumnsSchema>;
