import { z } from 'zod';
import { apiObject } from '#/core';
import { BoardFilterSchema } from './boardFilter';

export const GetBoardByFilterIdSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(BoardFilterSchema).optional(),
});

export type GetBoardByFilterId = z.infer<typeof GetBoardByFilterIdSchema>;
