import { SecuritySchemeSchema, type SecurityScheme } from '#/models/securityScheme';
import { PermissionSchemeSchema, type PermissionScheme } from '#/models/permissionScheme';
import { ProjectIssueSecurityLevelsSchema, type ProjectIssueSecurityLevels } from '#/models/projectIssueSecurityLevels';
import { type GetProjectIssueSecurityScheme } from '#/parameters/getProjectIssueSecurityScheme';
import { type GetAssignedPermissionScheme } from '#/parameters/getAssignedPermissionScheme';
import { type AssignPermissionScheme } from '#/parameters/assignPermissionScheme';
import { type GetSecurityLevelsForProject } from '#/parameters/getSecurityLevelsForProject';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg) associated with the project.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or the _Administer Projects_
 * [project permission](https://confluence.atlassian.com/x/yodKLg).
 */
export async function getProjectIssueSecurityScheme(
  client: Client,
  parameters: GetProjectIssueSecurityScheme,
): Promise<SecurityScheme> {
  const config: SendRequestOptions<SecurityScheme> = {
    url: `/rest/api/3/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
    method: 'GET',
    schema: SecuritySchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Gets the [permission scheme](https://confluence.atlassian.com/x/yodKLg) associated with the project.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg).
 */
export async function getAssignedPermissionScheme(
  client: Client,
  parameters: GetAssignedPermissionScheme,
): Promise<PermissionScheme> {
  const config: SendRequestOptions<PermissionScheme> = {
    url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: PermissionSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Assigns a permission scheme with a project. See [Managing project
 * permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)
 */
export async function assignPermissionScheme(
  client: Client,
  parameters: AssignPermissionScheme,
): Promise<PermissionScheme> {
  const config: SendRequestOptions<PermissionScheme> = {
    url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      id: parameters.id,
    },
    schema: PermissionSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all [issue security](https://confluence.atlassian.com/x/J4lKLg) levels for the project that the user has
 * access to.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project, however, issue security
 * levels are only returned for authenticated user with _Set Issue Security_ [global
 * permission](https://confluence.atlassian.com/x/x4dKLg) for the project.
 */
export async function getSecurityLevelsForProject(
  client: Client,
  parameters: GetSecurityLevelsForProject,
): Promise<ProjectIssueSecurityLevels> {
  const config: SendRequestOptions<ProjectIssueSecurityLevels> = {
    url: `/rest/api/3/project/${parameters.projectKeyOrId}/securitylevel`,
    method: 'GET',
    schema: ProjectIssueSecurityLevelsSchema,
  };

  return await client.sendRequest(config);
}
