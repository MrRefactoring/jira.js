import { z } from 'zod';

export const DeleteRemoteIssueLinkByGlobalIdSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The global ID of a remote issue link. */
  globalId: z.string(),
});

export type DeleteRemoteIssueLinkByGlobalId = z.input<typeof DeleteRemoteIssueLinkByGlobalIdSchema>;
