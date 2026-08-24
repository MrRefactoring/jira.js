import { z } from 'zod';
import { apiObject } from '#/core';
import { WorklogSchema } from './worklog';

export const WorklogWithPaginationSchema = apiObject({
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  worklogs: z.array(WorklogSchema).optional(),
});

export type WorklogWithPagination = z.infer<typeof WorklogWithPaginationSchema>;
