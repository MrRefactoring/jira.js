import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectSchema } from './project';

export const PageProjectSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  nextPage: z.url().optional(),
  self: z.url().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(ProjectSchema).optional(),
});

export type PageProject = z.infer<typeof PageProjectSchema>;
