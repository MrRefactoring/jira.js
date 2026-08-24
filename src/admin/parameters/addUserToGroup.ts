import { z } from 'zod';

export const AddUserToGroupSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * A directory has a unique ID. Use the [Get directories
   * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-directory/#api-v2-orgs-orgid-directories-get)
   * to find the directory ID.
   */
  directoryId: z.string(),
  /**
   * A group has a unique ID. Use the [Get groups
   * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-groups/#api-v2-orgs-orgid-directories-directoryid-groups-get)
   * to find the group ID.
   */
  groupId: z.string(),
  /**
   * Every user has a unique ID. Find a user’s account ID by using the [Get users
   * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/#api-v2-orgs-orgid-directories-directoryid-users-get).
   */
  accountId: z.string(),
});

export type AddUserToGroup = z.input<typeof AddUserToGroupSchema>;
