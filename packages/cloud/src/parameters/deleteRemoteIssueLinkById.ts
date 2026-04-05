import { z } from 'zod';

export const DeleteRemoteIssueLinkByIdSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of a remote issue link. */
  linkId: z.string(),
});

export type DeleteRemoteIssueLinkById = z.input<typeof DeleteRemoteIssueLinkByIdSchema>;
