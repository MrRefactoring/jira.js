import { z } from 'zod';
import { RemoteIssueLinkRequestSchema } from '../models';

export const UpdateRemoteIssueLinkSchema = z
  .object({
    /** The ID or key of the issue. */
    issueIdOrKey: z.string(),
    /** The ID of the remote issue link. */
    linkId: z.string(),
  })
  .extend(RemoteIssueLinkRequestSchema.shape);

export type UpdateRemoteIssueLink = z.input<typeof UpdateRemoteIssueLinkSchema>;
