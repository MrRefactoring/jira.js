import { z } from 'zod';
import { apiObject } from '#/core';
import { BoardSchema } from './board';

export const PageBoardSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(BoardSchema).optional(),
});

export type PageBoard = z.infer<typeof PageBoardSchema>;
