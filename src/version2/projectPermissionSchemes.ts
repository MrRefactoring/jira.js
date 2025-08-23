import type { Client } from '../client';
import type { Request } from '../request';
import type { GetProjectIssueSecuritySchemeParameters } from './parameters/getProjectIssueSecuritySchemeParameters';
import type { GetAssignedPermissionSchemeParameters } from './parameters/getAssignedPermissionSchemeParameters';
import type { AssignPermissionSchemeParameters } from './parameters/assignPermissionSchemeParameters';
import type { GetSecurityLevelsForProjectParameters } from './parameters/getSecurityLevelsForProjectParameters';

export class ProjectPermissionSchemes {
  constructor(private client: Client) {}
  /**
   * Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg) associated with the project. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or the _Administer Projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getProjectIssueSecurityScheme(parameters: GetProjectIssueSecuritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Gets the [permission scheme](https://confluence.atlassian.com/x/yodKLg) associated with the project. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getAssignedPermissionScheme(parameters: GetAssignedPermissionSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Assigns a permission scheme with a project. See [Managing project
   * permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  async assignPermissionScheme(parameters: AssignPermissionSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'PUT',
      query: {
        expand: parameters.expand,
      },
      body: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all [issue security](https://confluence.atlassian.com/x/J4lKLg) levels for the project that the user has
   * access to. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project, however, issue security
   *   levels are only returned for authenticated user with _Set Issue Security_ [global
   *   permission](https://confluence.atlassian.com/x/x4dKLg) for the project.
   */
  async getSecurityLevelsForProject(parameters: GetSecurityLevelsForProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/securitylevel`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
