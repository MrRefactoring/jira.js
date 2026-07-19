import { z } from 'zod';

export const GetRemoteIssueLinkByIdSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the remote issue link. */
  linkId: z.string(),
});

export type GetRemoteIssueLinkById = z.input<typeof GetRemoteIssueLinkByIdSchema>;
