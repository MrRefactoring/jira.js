import { z } from 'zod';

export const GetIdsOfWorklogsDeletedSinceSchema = z.object({
  /** The date and time, as a UNIX timestamp in milliseconds, after which deleted worklogs are returned. */
  since: z.number().optional(),
});

export type GetIdsOfWorklogsDeletedSince = z.input<typeof GetIdsOfWorklogsDeletedSinceSchema>;
