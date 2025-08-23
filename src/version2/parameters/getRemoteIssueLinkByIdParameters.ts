import { z } from 'zod';

export const GetRemoteIssueLinkByIdParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the remote issue link. */
  linkId: z.string(),
});

export type GetRemoteIssueLinkByIdParameters = z.infer<typeof GetRemoteIssueLinkByIdParametersSchema>;
