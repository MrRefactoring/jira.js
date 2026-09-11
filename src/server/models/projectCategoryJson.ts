import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectCategoryJsonSchema = apiObject({
  description: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type ProjectCategoryJson = z.infer<typeof ProjectCategoryJsonSchema>;
