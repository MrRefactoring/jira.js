import { ApplicationRoleSchema, type ApplicationRole } from '../models/applicationRole';
import type { GetApplicationRole } from '../parameters/getApplicationRole';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns all application roles. In Jira, application roles are managed using the [Application access
 * configuration](https://confluence.atlassian.com/x/3YxjL) page.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAllApplicationRoles(client: Client, options?: RequestOptions): Promise<ApplicationRole[]> {
  const config: SendRequestOptions<ApplicationRole[]> = {
    url: '/rest/api/3/applicationrole',
    method: 'GET',
    schema: z.array(ApplicationRoleSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns an application role.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getApplicationRole(
  client: Client,
  parameters: GetApplicationRole,
  options?: RequestOptions,
): Promise<ApplicationRole> {
  const config: SendRequestOptions<ApplicationRole> = {
    url: `/rest/api/3/applicationrole/${parameters.key}`,
    method: 'GET',
    schema: ApplicationRoleSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
