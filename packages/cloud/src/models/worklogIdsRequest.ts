import { z } from 'zod';

export const WorklogIdsRequestSchema = z.object({
  /** A list of worklog IDs. */
  ids: z.array(z.number()),
});

export type WorklogIdsRequest = z.infer<typeof WorklogIdsRequestSchema>;
