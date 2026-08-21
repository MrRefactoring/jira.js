import { z } from 'zod';

export const GetFilterSchema = z.object({
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** The filter id. */
  id: z.string(),
});

export type GetFilter = z.input<typeof GetFilterSchema>;
