import { z } from 'zod';

export const DeleteRemoteIssueLinkByIdSchema = z.object({
  /** Id of the remote issue link */
  linkId: z.string(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type DeleteRemoteIssueLinkById = z.input<typeof DeleteRemoteIssueLinkByIdSchema>;
