import { z } from 'zod';

export const DeleteFilterSchema = z.object({
  /** The ID of the filter to delete. */
  id: z.number(),
});

export type DeleteFilter = z.input<typeof DeleteFilterSchema>;
