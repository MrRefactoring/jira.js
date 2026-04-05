import { z } from 'zod';

export const PageBoardFilterSchema = z.object({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().optional(),
        self: z.url().optional(),
      }),
    )
    .optional(),
});

export type PageBoardFilter = z.infer<typeof PageBoardFilterSchema>;
