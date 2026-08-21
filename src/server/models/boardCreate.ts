import { z } from 'zod';
import { apiObject } from '#/core';

export const BoardCreateSchema = apiObject({
  filterId: z.number().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
});

export type BoardCreate = z.infer<typeof BoardCreateSchema>;
