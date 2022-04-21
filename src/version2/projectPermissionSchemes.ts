import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ProjectPermissionSchemes {
  constructor(private client: Client) {}

  /**
   * Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or the _Administer Projects_
   * [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetProjectIssueSecurityScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or the _Administer Projects_
   * [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetProjectIssueSecurityScheme,
    callback?: never
  ): Promise<T>;
  async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetProjectIssueSecurityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Gets the [permission scheme](https://confluence.atlassian.com/x/yodKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getAssignedPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.GetAssignedPermissionScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Gets the [permission scheme](https://confluence.atlassian.com/x/yodKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getAssignedPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.GetAssignedPermissionScheme,
    callback?: never
  ): Promise<T>;
  async getAssignedPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.GetAssignedPermissionScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Assigns a permission scheme with a project. See [Managing project
   * permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  async assignPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.AssignPermissionScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Assigns a permission scheme with a project. See [Managing project
   * permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  async assignPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.AssignPermissionScheme,
    callback?: never
  ): Promise<T>;
  async assignPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.AssignPermissionScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all [issue security](https://confluence.atlassian.com/x/J4lKLg) levels for the project that the user has access to.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project, however, issue security
   * levels are only returned for authenticated user with _Set Issue Security_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) for the project.
   */
  async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(
    parameters: Parameters.GetSecurityLevelsForProject,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all [issue security](https://confluence.atlassian.com/x/J4lKLg) levels for the project that the user has access to.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project, however, issue security
   * levels are only returned for authenticated user with _Set Issue Security_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) for the project.
   */
  async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(
    parameters: Parameters.GetSecurityLevelsForProject,
    callback?: never
  ): Promise<T>;
  async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(
    parameters: Parameters.GetSecurityLevelsForProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/securitylevel`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
