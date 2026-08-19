import { z } from 'zod';
import { RemoteIssueLinkRequestSchema } from '../models';

export const CreateOrUpdateRemoteIssueLinkSchema = z.object(RemoteIssueLinkRequestSchema.shape).extend({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type CreateOrUpdateRemoteIssueLink = z.input<typeof CreateOrUpdateRemoteIssueLinkSchema>;
