import { z } from 'zod';

export const GetRemoteVersionLinksByVersionIdSchema = z.object({
  /** ID of the version. */
  versionId: z.string(),
});

export type GetRemoteVersionLinksByVersionId = z.input<typeof GetRemoteVersionLinksByVersionIdSchema>;
