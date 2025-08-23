import type { Client } from '../client';
import type { Request } from '../request';
import type { DeleteActorParameters } from './parameters/deleteActorParameters';
import type { AddActorUsersParameters } from './parameters/addActorUsersParameters';
import type { SetActorsParameters } from './parameters/setActorsParameters';
import type { DeleteProjectRoleActorsFromRoleParameters } from './parameters/deleteProjectRoleActorsFromRoleParameters';
import type { GetProjectRoleActorsForRoleParameters } from './parameters/getProjectRoleActorsForRoleParameters';
import type { AddProjectRoleActorsToRoleParameters } from './parameters/addProjectRoleActorsToRoleParameters';

export class ProjectRoleActors {
  constructor(private client: Client) {}
  /**
   * Deletes actors from a project role for the project. *
   *
   * - To remove default actors from the project role, use [Delete default actors from project
   *   role](#api-rest-api-2-role-id-actors-delete).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteActor(parameters: DeleteActorParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'DELETE',
      query: {
        user: parameters.user,
        group: parameters.group,
        groupId: parameters.groupId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds actors to a project role for the project. *
   *
   * - To replace all actors for the project, use [Set actors for project
   *   role](#api-rest-api-2-project-projectIdOrKey-role-id-put).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addActorUsers(parameters: AddActorUsersParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'POST',
      body: {
        group: parameters.group,
        groupId: parameters.groupId,
        user: parameters.user,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the actors for a project role for a project, replacing all existing actors. *
   *
   * - To add actors to the project without overwriting the existing list, use [Add actors to project
   *   role](#api-rest-api-2-project-projectIdOrKey-role-id-post).
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setActors(parameters: SetActorsParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'PUT',
      body: {
        categorisedActors: parameters.categorisedActors,
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the [default actors](#api-rest-api-2-resolution-get) from a project role. You may delete a group or user,
   * but you cannot delete a group and a user in the same request. *
   *
   * - Changing a project role's default actors does not affect project role members for projects already created.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProjectRoleActorsFromRole(parameters: DeleteProjectRoleActorsFromRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'DELETE',
      query: {
        user: parameters.user,
        groupId: parameters.groupId,
        group: parameters.group,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the [default actors](#api-rest-api-2-resolution-get) for the project role. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectRoleActorsForRole(parameters: GetProjectRoleActorsForRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds [default actors](#api-rest-api-2-resolution-get) to a role. You may add groups or users, but you cannot add
   * groups and users in the same request. *
   *
   * - Changing a project role's default actors does not affect project role members for projects already created.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addProjectRoleActorsToRole(parameters: AddProjectRoleActorsToRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'POST',
      body: {
        group: parameters.group,
        groupId: parameters.groupId,
        user: parameters.user,
      },
    };

    return this.client.sendRequest(request);
  }
}
