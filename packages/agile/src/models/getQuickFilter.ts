import { z } from 'zod';

export const GetQuickFilterSchema = z.object({
  boardId: z.number().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  jql: z.string().optional(),
  name: z.string().optional(),
  position: z.number().optional(),
});

export type GetQuickFilter = z.infer<typeof GetQuickFilterSchema>;
