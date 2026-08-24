import { z } from 'zod';
import { apiObject } from '#/core';
import { WorklogChangeSchema } from './worklogChange';

export const WorklogChangedSinceSchema = apiObject({
  isLastPage: z.boolean().optional(),
  lastPage: z.boolean().optional(),
  nextPage: z.url().optional(),
  self: z.url().optional(),
  since: z.number().optional(),
  until: z.number().optional(),
  values: z.array(WorklogChangeSchema).optional(),
});

export type WorklogChangedSince = z.infer<typeof WorklogChangedSinceSchema>;
