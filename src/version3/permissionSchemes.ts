import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class PermissionSchemes {
  constructor(private client: Client) {}

  /**
   * Returns all permission schemes.
   *
   * ### About permission schemes and grants
   *
   * A permission scheme is a collection of permission grants. A permission grant consists of a `holder` and a
   * `permission`.
   *
   * #### Holder object
   *
   * The `holder` object contains information about the user or group being granted the permission. For example, the
   * _Administer projects_ permission is granted to a group named _Teams in space administrators_. In this case, the
   * type is `"type": "group"`, and the parameter is the group name, `"parameter": "Teams in space administrators"` and
   * the value is group ID, `"value": "ca85fac0-d974-40ca-a615-7af99c48d24f"`.
   *
   * The `holder` object is defined by the following properties:
   *
   * - `type` Identifies the user or group (see the list of types below).
   * - `parameter` As a group's name can change, use of `value` is recommended. The value of this property depends on the
   *   `type`. For example, if the `type` is a group, then you need to specify the group name.
   * - `value` The value of this property depends on the `type`. If the `type` is a group, then you need to specify the
   *   group ID. For other `type` it has the same value as `parameter`
   *
   * The following `types` are available. The expected values for `parameter` and `value` are given in parentheses (some
   * types may not have a `parameter` or `value`):
   *
   * - `anyone` Grant for anonymous users.
   * - `applicationRole` Grant for users with access to the specified application (application name, application name).
   *   See [Update product access settings](https://confluence.atlassian.com/x/3YxjL) for more information.
   * - `assignee` Grant for the user currently assigned to an issue.
   * - `group` Grant for the specified group (`parameter` : group name, `value` : group ID).
   * - `groupCustomField` Grant for a user in the group selected in the specified custom field (`parameter` : custom field
   *   ID, `value` : custom field ID).
   * - `projectLead` Grant for a project lead.
   * - `projectRole` Grant for the specified project role (`parameter` :project role ID, `value` : project role ID).
   * - `reporter` Grant for the user who reported the issue.
   * - `sd.customer.portal.only` Jira Service Desk only. Grants customers permission to access the customer portal but not
   *   Jira. See [Customizing Jira Service Desk permissions](https://confluence.atlassian.com/x/24dKLg) for more
   *   information.
   * - `user` Grant for the specified user (`parameter` : user ID - historically this was the userkey but that is
   *   deprecated and the account ID should be used, `value` : user ID).
   * - `userCustomField` Grant for a user selected in the specified custom field (`parameter` : custom field ID, `value` :
   *   custom field ID).
   *
   * #### Built-in permissions
   *
   * The [built-in Jira permissions](https://confluence.atlassian.com/x/yodKLg) are listed below. Apps can also define
   * custom permissions. See the [project
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation
   * for more information.
   *
   * **Administration permissions**
   *
   * - `ADMINISTER_PROJECTS`
   * - `EDIT_WORKFLOW`
   * - `EDIT_ISSUE_LAYOUT`
   *
   * **Project permissions**
   *
   * - `BROWSE_PROJECTS`
   * - `MANAGE_SPRINTS_PERMISSION` (Jira Software only)
   * - `SERVICEDESK_AGENT` (Jira Service Desk only)
   * - `VIEW_DEV_TOOLS` (Jira Software only)
   * - `VIEW_READONLY_WORKFLOW`
   *
   * **Issue permissions**
   *
   * - `ASSIGNABLE_USER`
   * - `ASSIGN_ISSUES`
   * - `CLOSE_ISSUES`
   * - `CREATE_ISSUES`
   * - `DELETE_ISSUES`
   * - `EDIT_ISSUES`
   * - `LINK_ISSUES`
   * - `MODIFY_REPORTER`
   * - `MOVE_ISSUES`
   * - `RESOLVE_ISSUES`
   * - `SCHEDULE_ISSUES`
   * - `SET_ISSUE_SECURITY`
   * - `TRANSITION_ISSUES`
   *
   * **Voters and watchers permissions**
   *
   * - `MANAGE_WATCHERS`
   * - `VIEW_VOTERS_AND_WATCHERS`
   *
   * **Comments permissions**
   *
   * - `ADD_COMMENTS`
   * - `DELETE_ALL_COMMENTS`
   * - `DELETE_OWN_COMMENTS`
   * - `EDIT_ALL_COMMENTS`
   * - `EDIT_OWN_COMMENTS`
   *
   * **Attachments permissions**
   *
   * - `CREATE_ATTACHMENTS`
   * - `DELETE_ALL_ATTACHMENTS`
   * - `DELETE_OWN_ATTACHMENTS`
   *
   * **Time tracking permissions**
   *
   * - `DELETE_ALL_WORKLOGS`
   * - `DELETE_OWN_WORKLOGS`
   * - `EDIT_ALL_WORKLOGS`
   * - `EDIT_OWN_WORKLOGS`
   * - `WORK_ON_ISSUES`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAllPermissionSchemes<T = Models.PermissionSchemes>(
    parameters: Parameters.GetAllPermissionSchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all permission schemes.
   *
   * ### About permission schemes and grants
   *
   * A permission scheme is a collection of permission grants. A permission grant consists of a `holder` and a
   * `permission`.
   *
   * #### Holder object
   *
   * The `holder` object contains information about the user or group being granted the permission. For example, the
   * _Administer projects_ permission is granted to a group named _Teams in space administrators_. In this case, the
   * type is `"type": "group"`, and the parameter is the group name, `"parameter": "Teams in space administrators"` and
   * the value is group ID, `"value": "ca85fac0-d974-40ca-a615-7af99c48d24f"`.
   *
   * The `holder` object is defined by the following properties:
   *
   * - `type` Identifies the user or group (see the list of types below).
   * - `parameter` As a group's name can change, use of `value` is recommended. The value of this property depends on the
   *   `type`. For example, if the `type` is a group, then you need to specify the group name.
   * - `value` The value of this property depends on the `type`. If the `type` is a group, then you need to specify the
   *   group ID. For other `type` it has the same value as `parameter`
   *
   * The following `types` are available. The expected values for `parameter` and `value` are given in parentheses (some
   * types may not have a `parameter` or `value`):
   *
   * - `anyone` Grant for anonymous users.
   * - `applicationRole` Grant for users with access to the specified application (application name, application name).
   *   See [Update product access settings](https://confluence.atlassian.com/x/3YxjL) for more information.
   * - `assignee` Grant for the user currently assigned to an issue.
   * - `group` Grant for the specified group (`parameter` : group name, `value` : group ID).
   * - `groupCustomField` Grant for a user in the group selected in the specified custom field (`parameter` : custom field
   *   ID, `value` : custom field ID).
   * - `projectLead` Grant for a project lead.
   * - `projectRole` Grant for the specified project role (`parameter` :project role ID, `value` : project role ID).
   * - `reporter` Grant for the user who reported the issue.
   * - `sd.customer.portal.only` Jira Service Desk only. Grants customers permission to access the customer portal but not
   *   Jira. See [Customizing Jira Service Desk permissions](https://confluence.atlassian.com/x/24dKLg) for more
   *   information.
   * - `user` Grant for the specified user (`parameter` : user ID - historically this was the userkey but that is
   *   deprecated and the account ID should be used, `value` : user ID).
   * - `userCustomField` Grant for a user selected in the specified custom field (`parameter` : custom field ID, `value` :
   *   custom field ID).
   *
   * #### Built-in permissions
   *
   * The [built-in Jira permissions](https://confluence.atlassian.com/x/yodKLg) are listed below. Apps can also define
   * custom permissions. See the [project
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation
   * for more information.
   *
   * **Administration permissions**
   *
   * - `ADMINISTER_PROJECTS`
   * - `EDIT_WORKFLOW`
   * - `EDIT_ISSUE_LAYOUT`
   *
   * **Project permissions**
   *
   * - `BROWSE_PROJECTS`
   * - `MANAGE_SPRINTS_PERMISSION` (Jira Software only)
   * - `SERVICEDESK_AGENT` (Jira Service Desk only)
   * - `VIEW_DEV_TOOLS` (Jira Software only)
   * - `VIEW_READONLY_WORKFLOW`
   *
   * **Issue permissions**
   *
   * - `ASSIGNABLE_USER`
   * - `ASSIGN_ISSUES`
   * - `CLOSE_ISSUES`
   * - `CREATE_ISSUES`
   * - `DELETE_ISSUES`
   * - `EDIT_ISSUES`
   * - `LINK_ISSUES`
   * - `MODIFY_REPORTER`
   * - `MOVE_ISSUES`
   * - `RESOLVE_ISSUES`
   * - `SCHEDULE_ISSUES`
   * - `SET_ISSUE_SECURITY`
   * - `TRANSITION_ISSUES`
   *
   * **Voters and watchers permissions**
   *
   * - `MANAGE_WATCHERS`
   * - `VIEW_VOTERS_AND_WATCHERS`
   *
   * **Comments permissions**
   *
   * - `ADD_COMMENTS`
   * - `DELETE_ALL_COMMENTS`
   * - `DELETE_OWN_COMMENTS`
   * - `EDIT_ALL_COMMENTS`
   * - `EDIT_OWN_COMMENTS`
   *
   * **Attachments permissions**
   *
   * - `CREATE_ATTACHMENTS`
   * - `DELETE_ALL_ATTACHMENTS`
   * - `DELETE_OWN_ATTACHMENTS`
   *
   * **Time tracking permissions**
   *
   * - `DELETE_ALL_WORKLOGS`
   * - `DELETE_OWN_WORKLOGS`
   * - `EDIT_ALL_WORKLOGS`
   * - `EDIT_OWN_WORKLOGS`
   * - `WORK_ON_ISSUES`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAllPermissionSchemes<T = Models.PermissionSchemes>(
    parameters?: Parameters.GetAllPermissionSchemes,
    callback?: never,
  ): Promise<T>;
  async getAllPermissionSchemes<T = Models.PermissionSchemes>(
    parameters?: Parameters.GetAllPermissionSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/permissionscheme',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new permission scheme. You can create a permission scheme with or without defining a set of permission
   * grants.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.CreatePermissionScheme | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new permission scheme. You can create a permission scheme with or without defining a set of permission
   * grants.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPermissionScheme<T = Models.PermissionScheme>(
    parameters?: Parameters.CreatePermissionScheme,
    callback?: never,
  ): Promise<T>;
  async createPermissionScheme<T = Models.PermissionScheme>(
    parameters?: Parameters.CreatePermissionScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/permissionscheme',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        ...parameters,
        expand: undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.GetPermissionScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.GetPermissionScheme,
    callback?: never,
  ): Promise<T>;
  async getPermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.GetPermissionScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a permission scheme. Below are some important things to note when using this resource:
   *
   * - If a permissions list is present in the request, then it is set in the permission scheme, overwriting _all
   *   existing_ grants.
   * - If you want to update only the name and description, then do not send a permissions list in the request.
   * - Sending an empty list will remove all permission grants from the permission scheme.
   *
   * If you want to add or delete a permission grant instead of updating the whole list, see [Create permission
   * grant](#api-rest-api-3-permissionscheme-schemeId-permission-post) or [Delete permission scheme
   * entity](#api-rest-api-3-permissionscheme-schemeId-permission-permissionId-delete).
   *
   * See [About permission schemes and grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for
   * more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.UpdatePermissionScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates a permission scheme. Below are some important things to note when using this resource:
   *
   * - If a permissions list is present in the request, then it is set in the permission scheme, overwriting _all
   *   existing_ grants.
   * - If you want to update only the name and description, then do not send a permissions list in the request.
   * - Sending an empty list will remove all permission grants from the permission scheme.
   *
   * If you want to add or delete a permission grant instead of updating the whole list, see [Create permission
   * grant](#api-rest-api-3-permissionscheme-schemeId-permission-post) or [Delete permission scheme
   * entity](#api-rest-api-3-permissionscheme-schemeId-permission-permissionId-delete).
   *
   * See [About permission schemes and grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for
   * more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.UpdatePermissionScheme,
    callback?: never,
  ): Promise<T>;
  async updatePermissionScheme<T = Models.PermissionScheme>(
    parameters: Parameters.UpdatePermissionScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: {
        ...parameters,
        schemeId: undefined,
        expand: undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePermissionScheme<T = void>(
    parameters: Parameters.DeletePermissionScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePermissionScheme<T = void>(parameters: Parameters.DeletePermissionScheme, callback?: never): Promise<T>;
  async deletePermissionScheme<T = void>(
    parameters: Parameters.DeletePermissionScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all permission grants for a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPermissionSchemeGrants<T = Models.PermissionGrants>(
    parameters: Parameters.GetPermissionSchemeGrants,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all permission grants for a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPermissionSchemeGrants<T = Models.PermissionGrants>(
    parameters: Parameters.GetPermissionSchemeGrants,
    callback?: never,
  ): Promise<T>;
  async getPermissionSchemeGrants<T = Models.PermissionGrants>(
    parameters: Parameters.GetPermissionSchemeGrants,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a permission grant in a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPermissionGrant<T = Models.PermissionGrant>(
    parameters: Parameters.CreatePermissionGrant,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a permission grant in a permission scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPermissionGrant<T = Models.PermissionGrant>(
    parameters: Parameters.CreatePermissionGrant,
    callback?: never,
  ): Promise<T>;
  async createPermissionGrant<T = Models.PermissionGrant>(
    parameters: Parameters.CreatePermissionGrant,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission`,
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: {
        holder: parameters.holder,
        id: parameters.id,
        permission: parameters.permission,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a permission grant.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPermissionSchemeGrant<T = Models.PermissionGrant>(
    parameters: Parameters.GetPermissionSchemeGrant,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a permission grant.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPermissionSchemeGrant<T = Models.PermissionGrant>(
    parameters: Parameters.GetPermissionSchemeGrant,
    callback?: never,
  ): Promise<T>;
  async getPermissionSchemeGrant<T = Models.PermissionGrant>(
    parameters: Parameters.GetPermissionSchemeGrant,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a permission grant from a permission scheme. See [About permission schemes and
   * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePermissionSchemeEntity<T = void>(
    parameters: Parameters.DeletePermissionSchemeEntity,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a permission grant from a permission scheme. See [About permission schemes and
   * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePermissionSchemeEntity<T = void>(
    parameters: Parameters.DeletePermissionSchemeEntity,
    callback?: never,
  ): Promise<T>;
  async deletePermissionSchemeEntity<T = void>(
    parameters: Parameters.DeletePermissionSchemeEntity,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
