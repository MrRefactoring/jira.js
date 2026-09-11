import { z } from 'zod';
import { apiObject } from '#/core';

export const BoardSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
  type: z.string().optional(),
});

export type Board = z.infer<typeof BoardSchema>;
