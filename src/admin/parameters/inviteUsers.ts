import { z } from 'zod';
import { MultidirectoryInviteApiRequestSchema } from '../models';

export const InviteUsersSchema = z.object(MultidirectoryInviteApiRequestSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
});

export type InviteUsers = z.input<typeof InviteUsersSchema>;
