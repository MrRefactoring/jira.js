import { z } from 'zod';
import { apiObject } from '#/core';

export const WorklogIdsRequestSchema = apiObject({
  /** List of worklog ids */
  ids: z.array(z.number()).optional(),
});

export type WorklogIdsRequest = z.infer<typeof WorklogIdsRequestSchema>;
