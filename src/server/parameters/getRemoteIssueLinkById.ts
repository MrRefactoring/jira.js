import { z } from 'zod';

export const GetRemoteIssueLinkByIdSchema = z.object({
  /** Id of the remote issue link */
  linkId: z.string(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetRemoteIssueLinkById = z.input<typeof GetRemoteIssueLinkByIdSchema>;
