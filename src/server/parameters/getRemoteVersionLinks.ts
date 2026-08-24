import { z } from 'zod';

export const GetRemoteVersionLinksSchema = z.object({
  /** The id of the remote issue link to be returned. */
  globalId: z.string().optional(),
});

export type GetRemoteVersionLinks = z.input<typeof GetRemoteVersionLinksSchema>;
