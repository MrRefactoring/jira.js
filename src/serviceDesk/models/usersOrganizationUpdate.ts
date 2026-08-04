import { z } from 'zod';
import { apiObject } from '#/core';

export const UsersOrganizationUpdateSchema = apiObject({
  /** List of customers, specific by account IDs, to add to or remove from the organization. */
  accountIds: z.array(z.string()).optional(),
  /** The organizationId in which users need to be added */
  organizationId: z.number().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. Use `accountIds` instead.
   */
  usernames: z.array(z.string()).optional(),
});

export type UsersOrganizationUpdate = z.infer<typeof UsersOrganizationUpdateSchema>;
