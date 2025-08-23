import { z } from 'zod';

export const DeleteRemoteIssueLinkByGlobalIdParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The global ID of a remote issue link. */
  globalId: z.string(),
});

export type DeleteRemoteIssueLinkByGlobalIdParameters = z.infer<typeof DeleteRemoteIssueLinkByGlobalIdParametersSchema>;
