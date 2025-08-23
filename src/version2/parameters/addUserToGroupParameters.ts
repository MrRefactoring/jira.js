import { z } from 'zod';

export const AddUserToGroupParametersSchema = z.object({
  /**
   * As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This
   * parameter cannot be used with the `groupId` parameter.
   */
  groupname: z.string().optional(),
  /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
  groupId: z.string().optional(),
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

export type AddUserToGroupParameters = z.infer<typeof AddUserToGroupParametersSchema>;
