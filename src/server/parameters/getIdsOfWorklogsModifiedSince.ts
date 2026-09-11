import { z } from 'zod';

export const GetIdsOfWorklogsModifiedSinceSchema = z.object({
  /** A date time in unix timestamp format since when updated worklogs will be returned. */
  since: z.number().optional(),
});

export type GetIdsOfWorklogsModifiedSince = z.input<typeof GetIdsOfWorklogsModifiedSinceSchema>;
