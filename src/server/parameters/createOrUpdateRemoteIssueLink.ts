import { z } from 'zod';
import { RemoteIssueLinkCreateOrUpdateRequestSchema } from '../models';

export const CreateOrUpdateRemoteIssueLinkSchema = z.object(RemoteIssueLinkCreateOrUpdateRequestSchema.shape).extend({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type CreateOrUpdateRemoteIssueLink = z.input<typeof CreateOrUpdateRemoteIssueLinkSchema>;
