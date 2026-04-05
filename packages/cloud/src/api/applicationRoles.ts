import { ApplicationRoleSchema, type ApplicationRole } from '#/models/applicationRole';
import { type GetApplicationRole } from '#/parameters/getApplicationRole';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns all application roles. In Jira, application roles are managed using the [Application access
 * configuration](https://confluence.atlassian.com/x/3YxjL) page.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAllApplicationRoles(client: Client): Promise<ApplicationRole[]> {
  const config: SendRequestOptions<ApplicationRole[]> = {
    url: '/rest/api/3/applicationrole',
    method: 'GET',
    schema: z.array(ApplicationRoleSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns an application role.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getApplicationRole(client: Client, parameters: GetApplicationRole): Promise<ApplicationRole> {
  const config: SendRequestOptions<ApplicationRole> = {
    url: `/rest/api/3/applicationrole/${parameters.key}`,
    method: 'GET',
    schema: ApplicationRoleSchema,
  };

  return await client.sendRequest(config);
}
