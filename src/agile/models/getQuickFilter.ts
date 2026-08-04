import { z } from 'zod';
import { apiObject } from '#/core';

export const GetQuickFilterSchema = apiObject({
  boardId: z.number().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  jql: z.string().optional(),
  name: z.string().optional(),
  position: z.number().optional(),
});

export type GetQuickFilter = z.infer<typeof GetQuickFilterSchema>;
