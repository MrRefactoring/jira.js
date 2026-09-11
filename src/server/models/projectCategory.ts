import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectCategorySchema = apiObject({
  description: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
});

export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;
