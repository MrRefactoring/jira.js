import { z } from 'zod';
import { OrganizationLevelRoleApiRequestSchema } from '../models';

export const AssignOrganizationRoleSchema = z.object(OrganizationLevelRoleApiRequestSchema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * Every user has a unique ID. Find a user’s account ID by using the [Get users
   * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/#api-v2-orgs-orgid-directories-directoryid-users-get).
   */
  userId: z.string(),
});

export type AssignOrganizationRole = z.input<typeof AssignOrganizationRoleSchema>;
