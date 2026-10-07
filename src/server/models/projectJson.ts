import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectCategorySchema } from './projectCategory';

export const ProjectJsonSchema = apiObject({
  avatarUrls: z.record(z.string(), z.string()).optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  projectCategory: ProjectCategorySchema.optional(),
  projectTypeKey: z.string().optional(),
  self: z.string().optional(),
});

export type ProjectJson = z.infer<typeof ProjectJsonSchema>;
