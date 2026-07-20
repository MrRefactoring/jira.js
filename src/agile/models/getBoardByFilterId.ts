import { z } from 'zod';
import { apiObject } from '#/core';

export const GetBoardByFilterIdSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z
    .array(
      apiObject({
        id: z.number().optional(),
        name: z.string().optional(),
        self: z.url().optional(),
      }),
    )
    .optional(),
});

export type GetBoardByFilterId = z.infer<typeof GetBoardByFilterIdSchema>;
