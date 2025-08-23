import { z } from 'zod';

export const DeleteRemoteIssueLinkByIdParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of a remote issue link. */
  linkId: z.string(),
});

export type DeleteRemoteIssueLinkByIdParameters = z.infer<typeof DeleteRemoteIssueLinkByIdParametersSchema>;
