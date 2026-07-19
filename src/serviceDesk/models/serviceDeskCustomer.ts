import { z } from 'zod';
import { apiObject } from '#/core';

export const ServiceDeskCustomerSchema = apiObject({
  /** List of users, specified by account IDs, to add to or remove from a service desk. */
  accountIds: z.array(z.string()).optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. Use `accountIds` instead.
   */
  usernames: z.array(z.string()).optional(),
});

export type ServiceDeskCustomer = z.infer<typeof ServiceDeskCustomerSchema>;
