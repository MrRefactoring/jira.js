import { z } from 'zod';
import { RemoteIssueLinkCreateOrUpdateRequestSchema } from '../models';

export const UpdateRemoteIssueLinkSchema = z.object(RemoteIssueLinkCreateOrUpdateRequestSchema.shape).extend({
  /** Id of the remote issue link */
  linkId: z.string(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type UpdateRemoteIssueLink = z.input<typeof UpdateRemoteIssueLinkSchema>;
