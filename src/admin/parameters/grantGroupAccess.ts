import { z } from 'zod';

export const GrantGroupAccessSchema = z.object({
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
   * A resource or workspace refers to a specific instance of an Atlassian app, which has a unique ID. Use the [Get
   * workspaces
   * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-workspaces/#api-v2-orgs-orgid-workspaces-post)
   * to find the resource ID.
   */
  resourceId: z.string(),
  /**
   * Valid values: atlassian/user, atlassian/user-access-admin, atlassian/admin, atlassian/guest, atlassian/contributor,
   * atlassian/customer, atlassian/basic, atlassian/stakeholder, atlassian/viewer
   */
  roleId: z.string(),
});

export type GrantGroupAccess = z.input<typeof GrantGroupAccessSchema>;
