import { z } from 'zod';

export const DeleteRemoteIssueLinkByGlobalIdSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Global id of the remote issue link */
  globalId: z.string(),
});

export type DeleteRemoteIssueLinkByGlobalId = z.input<typeof DeleteRemoteIssueLinkByGlobalIdSchema>;
