import { z } from 'zod';
import { apiObject } from '#/core';

export const WorklogIdsRequestSchema = apiObject({
  /** A list of worklog IDs. */
  ids: z.array(z.number()),
});

export type WorklogIdsRequest = z.infer<typeof WorklogIdsRequestSchema>;
