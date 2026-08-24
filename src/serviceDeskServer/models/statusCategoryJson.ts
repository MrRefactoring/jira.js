import { z } from 'zod';
import { apiObject } from '#/core';

export const StatusCategoryJsonSchema = apiObject({
  colorName: z.string().optional(),
  id: z.number().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type StatusCategoryJson = z.infer<typeof StatusCategoryJsonSchema>;
