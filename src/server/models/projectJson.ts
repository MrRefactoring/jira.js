import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectCategoryJsonSchema } from './projectCategoryJson';

export const ProjectJsonSchema = apiObject({
  avatarUrls: z.record(z.string(), z.any()).optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  projectCategory: ProjectCategoryJsonSchema.optional(),
  projectTypeKey: z.string().optional(),
  self: z.string().optional(),
});

export type ProjectJson = z.infer<typeof ProjectJsonSchema>;
