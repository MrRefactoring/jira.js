import { SecuritySchemesSchema, type SecuritySchemes } from '../models/securitySchemes';
import { SecuritySchemeSchema, type SecurityScheme } from '../models/securityScheme';
import type { GetIssueSecurityScheme } from '../parameters/getIssueSecurityScheme';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns all [issue security schemes](https://confluence.atlassian.com/x/J4lKLg).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueSecuritySchemes(client: Client, options?: RequestOptions): Promise<SecuritySchemes> {
  const config: SendRequestOptions<SecuritySchemes> = {
    url: '/rest/api/3/issuesecurityschemes',
    method: 'GET',
    schema: SecuritySchemesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns an issue security scheme along with its security levels.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses the
 *   requested issue security scheme.
 */
export async function getIssueSecurityScheme(
  client: Client,
  parameters: GetIssueSecurityScheme,
  options?: RequestOptions,
): Promise<SecurityScheme> {
  const config: SendRequestOptions<SecurityScheme> = {
    url: `/rest/api/3/issuesecurityschemes/${parameters.id}`,
    method: 'GET',
    schema: SecuritySchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
