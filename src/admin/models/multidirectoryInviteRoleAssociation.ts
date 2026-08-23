import { z } from 'zod';
import { apiObject } from '#/core';

export const MultidirectoryInviteRoleAssociationSchema = apiObject({
  /**
   * A resource or workspace refers to a specific instance of an Atlassian app, which has a unique ID. Use the [Get
   * Workspaces
   * endpoint](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-workspaces/#api-v2-orgs-orgid-workspaces-post)
   * to find the resource ID.
   */
  resource: z.string(),
  /**
   * Role to assign to a resource. Valid values:
   *
   * - `atlassian/user`
   * - `atlassian/admin`
   * - `atlassian/guest`
   * - `atlassian/contributor`
   * - `atlassian/customer`
   * - `atlassian/basic`
   * - `atlassian/stakeholder`
   * - `atlassian/viewer`
   */
  role: z.string(),
});

export type MultidirectoryInviteRoleAssociation = z.infer<typeof MultidirectoryInviteRoleAssociationSchema>;
