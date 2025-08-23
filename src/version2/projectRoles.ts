import type { Client } from '../client';
import type { Request } from '../request';
import type { GetProjectRolesParameters } from './parameters/getProjectRolesParameters';
import type { GetProjectRoleParameters } from './parameters/getProjectRoleParameters';
import type { GetProjectRoleDetailsParameters } from './parameters/getProjectRoleDetailsParameters';
import type { CreateProjectRoleParameters } from './parameters/createProjectRoleParameters';
import type { DeleteProjectRoleParameters } from './parameters/deleteProjectRoleParameters';
import type { GetProjectRoleByIdParameters } from './parameters/getProjectRoleByIdParameters';
import type { PartialUpdateProjectRoleParameters } from './parameters/partialUpdateProjectRoleParameters';
import type { FullyUpdateProjectRoleParameters } from './parameters/fullyUpdateProjectRoleParameters';

export class ProjectRoles {
  constructor(private client: Client) {}
  /**
   * Returns a list of [project
   * roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) for the project
   * returning the name and self URL for each role. *
   *
   * - Note that all project roles are shared with all projects in Jira Cloud. See [Get all project
   *   roles](#api-rest-api-2-role-get) for more information.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any project on the site
   *   or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRoles(parameters: GetProjectRolesParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a project role's details and actors associated with the project. The list of actors is sorted by display
   * name. *
   *
   * - To check whether a user belongs to a role based on their group memberships, use [Get
   *   user](#api-rest-api-2-user-get) with the `groups` expand parameter selected. Then check whether the user keys and
   *   groups match with the actors returned for the project.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRole(parameters: GetProjectRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'GET',
      query: {
        excludeInactiveUsers: parameters.excludeInactiveUsers,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all [project roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) and
   * the details for each role. Note that the list of project roles is common to all projects. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectRoleDetails(parameters: GetProjectRoleDetailsParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/roledetails`,
      method: 'GET',
      query: {
        currentMember: parameters.currentMember,
        excludeConnectAddons: parameters.excludeConnectAddons,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Gets a list of all project roles, complete with project role details and default actors. *
   *
   * - ### About project roles
   * -
   * - [Project roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) are a flexible
   *   way to to associate users and groups with projects. In Jira Cloud, the list of project roles is shared globally
   *   with all projects, but each project can have a different set of actors associated with it (unlike groups, which
   *   have the same membership throughout all Jira applications).
   * -
   * - Project roles are used in [permission schemes](#api-rest-api-2-permissionscheme-get), [email notification
   *   schemes](#api-rest-api-2-notificationscheme-get), [issue security
   *   levels](#api-rest-api-2-issuesecurityschemes-get), [comment visibility](#api-rest-api-2-comment-list-post), and
   *   workflow conditions.
   * -
   * - #### Members and actors
   * -
   * - In the Jira REST API, a member of a project role is called an _actor_. An _actor_ is a group or user associated
   *   with a project role.
   * -
   * - Actors may be set as [default
   *   members](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/#Specifying-'default-members'-for-a-project-role)
   *   of the project role or set at the project level:
   * -
   * - - Default actors: Users and groups that are assigned to the project role for all newly created projects. The default
   *       actors can be removed at the project level later if desired.
   * - - Actors: Users and groups that are associated with a project role for a project, which may differ from the default
   *       actors. This enables you to assign a user to different roles in different projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllProjectRoles() {
    const request: Request = {
      url: '/rest/api/2/role',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a new project role with no [default actors](#api-rest-api-2-resolution-get). You can use the [Add default
   * actors to project role](#api-rest-api-2-role-id-actors-post) operation to add default actors to the project role
   * after creating it. *
   *
   * - _Note that although a new project role is available to all projects upon creation, any default actors that are
   *   associated with the project role are not added to projects that existed prior to the role being created._<
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectRole(parameters: CreateProjectRoleParameters) {
    const request: Request = {
      url: '/rest/api/2/role',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in
   * use. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProjectRole(parameters: DeleteProjectRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'DELETE',
      query: {
        swap: parameters.swap,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Gets the project role details and the default actors associated with the role. The list of default actors is sorted
   * by display name. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRoleById(parameters: GetProjectRoleByIdParameters) {
    const request: Request = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates either the project role's name or its description. *
   *
   * - You cannot update both the name and description at the same time using this operation. If you send a request with a
   *   name and a description only the name is updated.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async partialUpdateProjectRole(parameters: PartialUpdateProjectRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the project role's name and description. You must include both a name and a description in the request. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async fullyUpdateProjectRole(parameters: FullyUpdateProjectRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }
}
