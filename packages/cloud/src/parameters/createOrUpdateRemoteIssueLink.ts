import { z } from 'zod';
import { RemoteIssueLinkRequestSchema } from '../models';

export const CreateOrUpdateRemoteIssueLinkSchema = z
  .object({
    /** The ID or key of the issue. */
    issueIdOrKey: z.string(),
  })
  .extend(RemoteIssueLinkRequestSchema.shape);

export type CreateOrUpdateRemoteIssueLink = z.input<typeof CreateOrUpdateRemoteIssueLinkSchema>;
