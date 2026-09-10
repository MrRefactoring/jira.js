import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const RoleApiRequestSchema = apiObject({
  /** Role to assign/revoke for a user */
  role: openEnum([
    'atlassian/user',
    'atlassian/user-access-admin',
    'atlassian/admin',
    'atlassian/guest',
    'atlassian/contributor',
    'atlassian/customer',
    'atlassian/basic',
    'atlassian/stakeholder',
    'atlassian/site-admin',
    'atlassian/org-admin',
  ]),
  /**
   * Use the [Get Workspaces
   * API](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-workspaces/#api-v2-orgs-orgid-workspaces-post)
   * to get an id. Resource is required for all roles other than org-admin. Any resource passed for org-admin shall be
   * ignored
   */
  resource: z.string().optional(),
});

export type RoleApiRequest = z.infer<typeof RoleApiRequestSchema>;
