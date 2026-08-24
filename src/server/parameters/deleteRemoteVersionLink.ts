import { z } from 'zod';

export const DeleteRemoteVersionLinkSchema = z.object({
  /** ID of the version. */
  versionId: z.string(),
  /** The id of the remote issue link to be deleted. */
  globalId: z.string(),
});

export type DeleteRemoteVersionLink = z.input<typeof DeleteRemoteVersionLinkSchema>;
