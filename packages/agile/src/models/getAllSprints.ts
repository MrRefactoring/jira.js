import { z } from 'zod';
import { SprintSchema } from './sprint';

export const GetAllSprintsSchema = z.object({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(SprintSchema).optional(),
});

export type GetAllSprints = z.infer<typeof GetAllSprintsSchema>;
