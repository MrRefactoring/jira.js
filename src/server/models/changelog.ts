import { z } from 'zod';
import { apiObject } from '#/core';
import { ChangeHistorySchema } from './changeHistory';

export const ChangelogSchema = apiObject({
  histories: z.array(ChangeHistorySchema).optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type Changelog = z.infer<typeof ChangelogSchema>;
