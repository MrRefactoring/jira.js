import { z } from 'zod';

export const GetBoardByFilterIdSchema = z.object({
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

export type GetBoardByFilterId = z.infer<typeof GetBoardByFilterIdSchema>;
