import { z } from 'zod';

export const GetIdsOfWorklogsDeletedSinceParametersSchema = z.object({
  /** The date and time, as a UNIX timestamp in milliseconds, after which deleted worklogs are returned. */
  since: z.number().int().optional(),
});

export type GetIdsOfWorklogsDeletedSinceParameters = z.infer<typeof GetIdsOfWorklogsDeletedSinceParametersSchema>;
