import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectPermissionSchemes {
  constructor(private client: Client) {}

  /**
   * Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or the *Administer Projects*
   * [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetProjectIssueSecurityScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or the *Administer Projects*
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
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.projectPermissionSchemes.getProjectIssueSecurityScheme',
    });
  }

  /**
   * Gets the [permission scheme](https://confluence.atlassian.com/x/yodKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer projects* [project
   * permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getAssignedPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.GetAssignedPermissionScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Gets the [permission scheme](https://confluence.atlassian.com/x/yodKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer projects* [project
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
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.projectPermissionSchemes.getAssignedPermissionScheme',
    });
  }

  /**
   * Assigns a permission scheme with a project. See [Managing project
   * permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  async assignPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.AssignPermissionScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Assigns a permission scheme with a project. See [Managing project
   * permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)
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
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.projectPermissionSchemes.assignPermissionScheme',
    });
  }

  /**
   * Returns all [issue security](https://confluence.atlassian.com/x/J4lKLg) levels for the project that the user has access to.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * projects* [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project, however, issue security
   * levels are only returned for authenticated user with *Set Issue Security* [global
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * projects* [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project, however, issue security
   * levels are only returned for authenticated user with *Set Issue Security* [global
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
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/securitylevel`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.projectPermissionSchemes.getSecurityLevelsForProject',
    });
  }
}
