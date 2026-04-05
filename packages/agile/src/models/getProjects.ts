import { z } from 'zod';
import { ProjectDetailsSchema } from './projectDetails';

export const GetProjectsSchema = z.object({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(ProjectDetailsSchema).optional(),
});

export type GetProjects = z.infer<typeof GetProjectsSchema>;
