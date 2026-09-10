import { z } from 'zod';
import { RoleApiRequestSchema } from '../models';

export const RevokeUserAccessSchema = z.object(RoleApiRequestSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * The UserId on which the action(Role Revoke) needs to happen. Use the [Search for users within an organization
   * API](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/#api-v1-orgs-orgid-users-get) to
   * get the userId.
   */
  userId: z.string(),
});

export type RevokeUserAccess = z.input<typeof RevokeUserAccessSchema>;
