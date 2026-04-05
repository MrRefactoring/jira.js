import { z } from 'zod';

export const BoardFilterSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
});

export type BoardFilter = z.infer<typeof BoardFilterSchema>;
