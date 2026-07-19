import { z } from 'zod';

export const GetQuickFilterSchema = z.object({
  boardId: z.number(),
  /** The ID of the requested quick filter. */
  quickFilterId: z.number(),
});

export type GetQuickFilter = z.input<typeof GetQuickFilterSchema>;
