import { z } from 'zod';

export const GetIdsOfWorklogsDeletedSinceSchema = z.object({
  /** A date time in unix timestamp format since when deleted worklogs will be returned. */
  since: z.number().optional(),
});

export type GetIdsOfWorklogsDeletedSince = z.input<typeof GetIdsOfWorklogsDeletedSinceSchema>;
