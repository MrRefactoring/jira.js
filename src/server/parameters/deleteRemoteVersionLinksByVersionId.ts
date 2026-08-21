import { z } from 'zod';

export const DeleteRemoteVersionLinksByVersionIdSchema = z.object({
  /** ID of the version. */
  versionId: z.string(),
});

export type DeleteRemoteVersionLinksByVersionId = z.input<typeof DeleteRemoteVersionLinksByVersionIdSchema>;
