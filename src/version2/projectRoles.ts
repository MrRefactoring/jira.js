import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ProjectRoles {
  constructor(private client: Client) {}

  /**
   * Returns a list of [project roles](https://confluence.atlassian.com/x/3odKLg) for the project returning the name and
   * self URL for each role.
   *
   * Note that all project roles are shared with all projects in Jira Cloud. See [Get all project
   * roles](#api-rest-api-2-role-get) for more information.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any project on the site
   * or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRoles<T = Record<string, string>>(
    parameters: Parameters.GetProjectRoles | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of [project roles](https://confluence.atlassian.com/x/3odKLg) for the project returning the name and
   * self URL for each role.
   *
   * Note that all project roles are shared with all projects in Jira Cloud. See [Get all project
   * roles](#api-rest-api-2-role-get) for more information.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any project on the site
   * or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRoles<T = Record<string, string>>(
    parameters: Parameters.GetProjectRoles | string,
    callback?: never
  ): Promise<T>;
  async getProjectRoles<T = Record<string, string>>(
    parameters: Parameters.GetProjectRoles | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/role`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a project role's details and actors associated with the project. The list of actors is sorted by display
   * name.
   *
   * To check whether a user belongs to a role based on their group memberships, use [Get
   * user](#api-rest-api-2-user-get) with the `groups` expand parameter selected. Then check whether the user keys and
   * groups match with the actors returned for the project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.GetProjectRole,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a project role's details and actors associated with the project. The list of actors is sorted by display
   * name.
   *
   * To check whether a user belongs to a role based on their group memberships, use [Get
   * user](#api-rest-api-2-user-get) with the `groups` expand parameter selected. Then check whether the user keys and
   * groups match with the actors returned for the project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRole, callback?: never): Promise<T>;
  async getProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.GetProjectRole,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'GET',
      params: {
        excludeInactiveUsers: parameters.excludeInactiveUsers,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all [project roles](https://confluence.atlassian.com/x/3odKLg) and the details for each role. Note that the
   * list of project roles is common to all projects.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectRoleDetails<T = Models.ProjectRoleDetails[]>(
    parameters: Parameters.GetProjectRoleDetails | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all [project roles](https://confluence.atlassian.com/x/3odKLg) and the details for each role. Note that the
   * list of project roles is common to all projects.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectRoleDetails<T = Models.ProjectRoleDetails[]>(
    parameters: Parameters.GetProjectRoleDetails | string,
    callback?: never
  ): Promise<T>;
  async getProjectRoleDetails<T = Models.ProjectRoleDetails[]>(
    parameters: Parameters.GetProjectRoleDetails | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/roledetails`,
      method: 'GET',
      params: {
        currentMember: typeof parameters !== 'string' && parameters.currentMember,
        excludeConnectAddons: typeof parameters !== 'string' && parameters.excludeConnectAddons,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Gets a list of all project roles, complete with project role details and default actors.
   *
   * ### About project roles
   *
   * [Project roles](https://confluence.atlassian.com/x/3odKLg) are a flexible way to to associate users and groups with
   * projects. In Jira Cloud, the list of project roles is shared globally with all projects, but each project can have
   * a different set of actors associated with it (unlike groups, which have the same membership throughout all Jira
   * applications).
   *
   * Project roles are used in [permission schemes](#api-rest-api-2-permissionscheme-get), [email notification
   * schemes](#api-rest-api-2-notificationscheme-get), [issue security
   * levels](#api-rest-api-2-issuesecurityschemes-get), [comment visibility](#api-rest-api-2-comment-list-post), and
   * workflow conditions.
   *
   * #### Members and actors
   *
   * In the Jira REST API, a member of a project role is called an _actor_. An _actor_ is a group or user associated
   * with a project role.
   *
   * Actors may be set as [default
   * members](https://confluence.atlassian.com/x/3odKLg#Managingprojectroles-Specifying'defaultmembers'foraprojectrole)
   * of the project role or set at the project level:
   *
   * - Default actors: Users and groups that are assigned to the project role for all newly created projects. The default
   *   actors can be removed at the project level later if desired.
   * - Actors: Users and groups that are associated with a project role for a project, which may differ from the default
   *   actors. This enables you to assign a user to different roles in different projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllProjectRoles<T = Models.ProjectRole[]>(callback: Callback<T>): Promise<void>;
  /**
   * Gets a list of all project roles, complete with project role details and default actors.
   *
   * ### About project roles
   *
   * [Project roles](https://confluence.atlassian.com/x/3odKLg) are a flexible way to to associate users and groups with
   * projects. In Jira Cloud, the list of project roles is shared globally with all projects, but each project can have
   * a different set of actors associated with it (unlike groups, which have the same membership throughout all Jira
   * applications).
   *
   * Project roles are used in [permission schemes](#api-rest-api-2-permissionscheme-get), [email notification
   * schemes](#api-rest-api-2-notificationscheme-get), [issue security
   * levels](#api-rest-api-2-issuesecurityschemes-get), [comment visibility](#api-rest-api-2-comment-list-post), and
   * workflow conditions.
   *
   * #### Members and actors
   *
   * In the Jira REST API, a member of a project role is called an _actor_. An _actor_ is a group or user associated
   * with a project role.
   *
   * Actors may be set as [default
   * members](https://confluence.atlassian.com/x/3odKLg#Managingprojectroles-Specifying'defaultmembers'foraprojectrole)
   * of the project role or set at the project level:
   *
   * - Default actors: Users and groups that are assigned to the project role for all newly created projects. The default
   *   actors can be removed at the project level later if desired.
   * - Actors: Users and groups that are associated with a project role for a project, which may differ from the default
   *   actors. This enables you to assign a user to different roles in different projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllProjectRoles<T = Models.ProjectRole[]>(callback?: never): Promise<T>;
  async getAllProjectRoles<T = Models.ProjectRole[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/role',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new project role with no [default actors](#api-rest-api-2-resolution-get). You can use the [Add default
   * actors to project role](#api-rest-api-2-role-id-actors-post) operation to add default actors to the project role
   * after creating it.
   *
   * _Note that although a new project role is available to all projects upon creation, any default actors that are
   * associated with the project role are not added to projects that existed prior to the role being created._<
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.CreateProjectRole,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new project role with no [default actors](#api-rest-api-2-resolution-get). You can use the [Add default
   * actors to project role](#api-rest-api-2-role-id-actors-post) operation to add default actors to the project role
   * after creating it.
   *
   * _Note that although a new project role is available to all projects upon creation, any default actors that are
   * associated with the project role are not added to projects that existed prior to the role being created._<
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.CreateProjectRole,
    callback?: never
  ): Promise<T>;
  async createProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.CreateProjectRole,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/role',
      method: 'POST',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Gets the project role details and the default actors associated with the role. The list of default actors is sorted
   * by display name.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRoleById<T = Models.ProjectRole>(
    parameters: Parameters.GetProjectRoleById | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Gets the project role details and the default actors associated with the role. The list of default actors is sorted
   * by display name.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRoleById<T = Models.ProjectRole>(
    parameters: Parameters.GetProjectRoleById | string,
    callback?: never
  ): Promise<T>;
  async getProjectRoleById<T = Models.ProjectRole>(
    parameters: Parameters.GetProjectRoleById | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/role/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates either the project role's name or its description.
   *
   * You cannot update both the name and description at the same time using this operation. If you send a request with a
   * name and a description only the name is updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async partialUpdateProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.PartialUpdateProjectRole,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates either the project role's name or its description.
   *
   * You cannot update both the name and description at the same time using this operation. If you send a request with a
   * name and a description only the name is updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async partialUpdateProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.PartialUpdateProjectRole,
    callback?: never
  ): Promise<T>;
  async partialUpdateProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.PartialUpdateProjectRole,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'POST',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the project role's name and description. You must include both a name and a description in the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async fullyUpdateProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.FullyUpdateProjectRole,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates the project role's name and description. You must include both a name and a description in the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async fullyUpdateProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.FullyUpdateProjectRole,
    callback?: never
  ): Promise<T>;
  async fullyUpdateProjectRole<T = Models.ProjectRole>(
    parameters: Parameters.FullyUpdateProjectRole,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in
   * use.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProjectRole<T = void>(
    parameters: Parameters.DeleteProjectRole | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in
   * use.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProjectRole<T = void>(parameters: Parameters.DeleteProjectRole | string, callback?: never): Promise<T>;
  async deleteProjectRole<T = void>(
    parameters: Parameters.DeleteProjectRole | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/role/${id}`,
      method: 'DELETE',
      params: {
        swap: typeof parameters !== 'string' && parameters.swap,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
