import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectDetailsSchema } from './projectDetails';

export const GetProjectsFullSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(ProjectDetailsSchema).optional(),
});

export type GetProjectsFull = z.infer<typeof GetProjectsFullSchema>;
