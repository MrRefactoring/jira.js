import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const RoleAssociationSchema = apiObject({
  /**
   * Use the [Get Workspaces
   * API](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-workspaces/#api-v2-orgs-orgid-workspaces-post)
   * to get an id. Only the following resources are valid:
   *
   * - Avp
   * - Beacon
   * - Bitbucket
   * - Compass
   * - Confluence
   * - Jira-admin
   * - Jira-core
   * - Jira-software
   * - Jira-servicedesk
   * - Jira-product-discovery
   * - Loom
   * - Mercury
   * - Opsgenie
   * - Platform
   * - Statuspage
   * - Townsquare
   * - Trello
   * - Unified-help
   */
  resource: z.string(),
  /** Role to assign to a resource */
  role: openEnum([
    'atlassian/user',
    'atlassian/admin',
    'atlassian/guest',
    'atlassian/customer',
    'atlassian/contributor',
    'atlassian/basic',
    'atlassian/stakeholder',
  ]),
});

export type RoleAssociation = z.infer<typeof RoleAssociationSchema>;
