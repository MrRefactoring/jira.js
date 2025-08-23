import { z } from 'zod';

export const UpdateUserToGroupBeanSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /**
   * This property is no longer available. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name: z.string().optional(),
});

export type UpdateUserToGroupBean = z.infer<typeof UpdateUserToGroupBeanSchema>;
