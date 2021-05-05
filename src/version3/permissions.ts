import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Permissions {
  constructor(private client: Client) {
  }

  /**
   * Returns a list of permissions indicating which permissions the user has. Details of the user's permissions can be obtained in a global, project, or issue context.
   *
   * The user is reported as having a project permission:
   *
   *  *  in the global context, if the user has the project permission in any project.
   *  *  for a project, where the project permission is determined using issue data, if the user meets the permission's criteria for any issue in the project. Otherwise, if the user has the project permission in the project.
   *  *  for an issue, where a project permission is determined using issue data, if the user has the permission in the issue. Otherwise, if the user has the project permission in the project containing the issue.
   *
   * This means that users may be shown as having an issue permission (such as EDIT\_ISSUES) in the global context or a project context but may not have the permission for any or all issues. For example, if Reporters have the EDIT\_ISSUES permission a user would be shown as having this permission in the global context or the context of a project, because any user can be a reporter. However, if they are not the user who reported the issue queried they would not have EDIT\_ISSUES permission for that issue.
   *
   * Global permissions are unaffected by context.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getMyPermissions<T = Models.Permissions>(parameters: Parameters.GetMyPermissions | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of permissions indicating which permissions the user has. Details of the user's permissions can be obtained in a global, project, or issue context.
   *
   * The user is reported as having a project permission:
   *
   *  *  in the global context, if the user has the project permission in any project.
   *  *  for a project, where the project permission is determined using issue data, if the user meets the permission's criteria for any issue in the project. Otherwise, if the user has the project permission in the project.
   *  *  for an issue, where a project permission is determined using issue data, if the user has the permission in the issue. Otherwise, if the user has the project permission in the project containing the issue.
   *
   * This means that users may be shown as having an issue permission (such as EDIT\_ISSUES) in the global context or a project context but may not have the permission for any or all issues. For example, if Reporters have the EDIT\_ISSUES permission a user would be shown as having this permission in the global context or the context of a project, because any user can be a reporter. However, if they are not the user who reported the issue queried they would not have EDIT\_ISSUES permission for that issue.
   *
   * Global permissions are unaffected by context.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getMyPermissions<T = Models.Permissions>(parameters?: Parameters.GetMyPermissions, callback?: never): Promise<T>;
  async getMyPermissions<T = Models.Permissions>(parameters?: Parameters.GetMyPermissions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/mypermissions',
      method: 'GET',
      params: {
        projectKey: parameters?.projectKey,
        projectId: parameters?.projectId,
        issueKey: parameters?.issueKey,
        issueId: parameters?.issueId,
        permissions: parameters?.permissions,
        projectUuid: parameters?.projectUuid,
        projectConfigurationUuid: parameters?.projectConfigurationUuid,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getMyPermissions' });
  }

  /**
   * Returns all permissions, including:
   *
   *  *  global permissions.
   *  *  project permissions.
   *  *  global permissions added by plugins.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllPermissions<T = Models.Permissions>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all permissions, including:
   *
   *  *  global permissions.
   *  *  project permissions.
   *  *  global permissions added by plugins.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllPermissions<T = Models.Permissions>(callback?: never): Promise<T>;
  async getAllPermissions<T = Models.Permissions>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/permissions',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getAllPermissions' });
  }

  /**
   * Returns:
   *
   *  *  for a list of global permissions, the global permissions granted to a user.
   *  *  for a list of project permissions and lists of projects and issues, for each project permission a list of the projects and issues a user can access or manipulate.
   *
   * If no account ID is provided, the operation returns details for the logged in user.
   *
   * Note that:
   *
   *  *  Invalid project and issue IDs are ignored.
   *  *  A maximum of 1000 projects and 1000 issues can be checked.
   *  *  Null values in `globalPermissions`, `projectPermissions`, `projectPermissions.projects`, and `projectPermissions.issues` are ignored.
   *  *  Empty strings in `projectPermissions.permissions` are ignored.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to check the permissions for other users, otherwise none. However, Connect apps can make a call from the app server to the product to obtain permission details for any user, without admin permission. This Connect app ability doesn't apply to calls made using AP.request() in a browser. */
  async getBulkPermissions<T = Models.BulkPermissionGrants>(parameters: Parameters.GetBulkPermissions | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns:
   *
   *  *  for a list of global permissions, the global permissions granted to a user.
   *  *  for a list of project permissions and lists of projects and issues, for each project permission a list of the projects and issues a user can access or manipulate.
   *
   * If no account ID is provided, the operation returns details for the logged in user.
   *
   * Note that:
   *
   *  *  Invalid project and issue IDs are ignored.
   *  *  A maximum of 1000 projects and 1000 issues can be checked.
   *  *  Null values in `globalPermissions`, `projectPermissions`, `projectPermissions.projects`, and `projectPermissions.issues` are ignored.
   *  *  Empty strings in `projectPermissions.permissions` are ignored.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to check the permissions for other users, otherwise none. However, Connect apps can make a call from the app server to the product to obtain permission details for any user, without admin permission. This Connect app ability doesn't apply to calls made using AP.request() in a browser. */
  async getBulkPermissions<T = Models.BulkPermissionGrants>(parameters?: Parameters.GetBulkPermissions, callback?: never): Promise<T>;
  async getBulkPermissions<T = Models.BulkPermissionGrants>(parameters?: Parameters.GetBulkPermissions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/permissions/check',
      method: 'POST',
      data: {
        projectPermissions: parameters?.projectPermissions,
        globalPermissions: parameters?.globalPermissions,
        accountId: parameters?.accountId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getBulkPermissions' });
  }

  /**
   * Returns all the projects where the user is granted a list of project permissions.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getPermittedProjects<T = Models.PermittedProjects>(parameters: Parameters.GetPermittedProjects | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns all the projects where the user is granted a list of project permissions.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getPermittedProjects<T = Models.PermittedProjects>(parameters?: Parameters.GetPermittedProjects, callback?: never): Promise<T>;
  async getPermittedProjects<T = Models.PermittedProjects>(parameters?: Parameters.GetPermittedProjects, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/permissions/project',
      method: 'POST',
      data: {
        permissions: parameters?.permissions,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getPermittedProjects' });
  }
}
