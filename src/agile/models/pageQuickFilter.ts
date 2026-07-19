import { z } from 'zod';
import { apiObject } from '#/core';

export const PageQuickFilterSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z
    .array(
      apiObject({
        boardId: z.number().optional(),
        description: z.string().optional(),
        id: z.number().optional(),
        jql: z.string().optional(),
        name: z.string().optional(),
        position: z.number().optional(),
      }),
    )
    .optional(),
});

export type PageQuickFilter = z.infer<typeof PageQuickFilterSchema>;
