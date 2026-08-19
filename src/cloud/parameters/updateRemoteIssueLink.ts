import { z } from 'zod';
import { RemoteIssueLinkRequestSchema } from '../models';

export const UpdateRemoteIssueLinkSchema = z.object(RemoteIssueLinkRequestSchema.shape).extend({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the remote issue link. */
  linkId: z.string(),
});

export type UpdateRemoteIssueLink = z.input<typeof UpdateRemoteIssueLinkSchema>;
