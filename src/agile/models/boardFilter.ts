import { z } from 'zod';
import { apiObject } from '#/core';

export const BoardFilterSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
});

export type BoardFilter = z.infer<typeof BoardFilterSchema>;
