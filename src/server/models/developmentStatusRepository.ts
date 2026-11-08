import { z } from 'zod';
import { apiObject } from '#/core';

export const DevelopmentStatusRepositorySchema = apiObject({
  name: z.string().optional(),
  url: z.string().optional(),
  commits: z.array(z.unknown()).optional(),
});

export type DevelopmentStatusRepository = z.infer<typeof DevelopmentStatusRepositorySchema>;
