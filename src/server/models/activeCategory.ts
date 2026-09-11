import { z } from 'zod';
import { apiObject } from '#/core';

export const ActiveCategorySchema = apiObject({
  current: z.string().optional(),
});

export type ActiveCategory = z.infer<typeof ActiveCategorySchema>;
