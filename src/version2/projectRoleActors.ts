import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectRoleActors {
  constructor(private client: Client) {
  }

  /**
   * Adds actors to a project role for the project.
   *
   * To replace all actors for the project, use [Set actors for project role](#api-rest-api-2-project-projectIdOrKey-role-id-put).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addActorUsers<T = Models.ProjectRole>(parameters: Parameters.AddActorUsers, callback: Callback<T>): Promise<void>;
  /**
   * Adds actors to a project role for the project.
   *
   * To replace all actors for the project, use [Set actors for project role](#api-rest-api-2-project-projectIdOrKey-role-id-put).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addActorUsers<T = Models.ProjectRole>(parameters: Parameters.AddActorUsers, callback?: never): Promise<T>;
  async addActorUsers<T = Models.ProjectRole>(parameters: Parameters.AddActorUsers, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'POST',
      data: {
        user: parameters.user,
        group: parameters.group,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectRoleActors.addActorUsers' });
  }

  /**
   * Sets the actors for a project role for a project, replacing all existing actors.
   *
   * To add actors to the project without overwriting the existing list, use [Add actors to project role](#api-rest-api-2-project-projectIdOrKey-role-id-post).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setActors<T = Models.ProjectRole>(parameters: Parameters.SetActors, callback: Callback<T>): Promise<void>;
  /**
   * Sets the actors for a project role for a project, replacing all existing actors.
   *
   * To add actors to the project without overwriting the existing list, use [Add actors to project role](#api-rest-api-2-project-projectIdOrKey-role-id-post).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setActors<T = Models.ProjectRole>(parameters: Parameters.SetActors, callback?: never): Promise<T>;
  async setActors<T = Models.ProjectRole>(parameters: Parameters.SetActors, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'PUT',
      data: {
        categorisedActors: parameters.categorisedActors,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectRoleActors.setActors' });
  }

  /**
   * Deletes actors from a project role for the project.
   *
   * To remove default actors from the project role, use [Delete default actors from project role](#api-rest-api-2-role-id-actors-delete).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteActor<T = void>(parameters: Parameters.DeleteActor, callback: Callback<T>): Promise<void>;
  /**
   * Deletes actors from a project role for the project.
   *
   * To remove default actors from the project role, use [Delete default actors from project role](#api-rest-api-2-role-id-actors-delete).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteActor<T = void>(parameters: Parameters.DeleteActor, callback?: never): Promise<T>;
  async deleteActor<T = void>(parameters: Parameters.DeleteActor, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'DELETE',
      params: {
        user: parameters.user,
        group: parameters.group,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectRoleActors.deleteActor' });
  }

  /**
   * Returns the [default actors](#api-rest-api-2-resolution-get) for the project role.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleActorsForRole, callback: Callback<T>): Promise<void>;
  /**
   * Returns the [default actors](#api-rest-api-2-resolution-get) for the project role.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleActorsForRole, callback?: never): Promise<T>;
  async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleActorsForRole, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectRoleActors.getProjectRoleActorsForRole' });
  }

  /**
   * Adds [default actors](#api-rest-api-2-resolution-get) to a role. You may add groups or users, but you cannot add groups and users in the same request.
   *
   * Changing a project role's default actors does not affect project role members for projects already created.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: Parameters.AddProjectRoleActorsToRole, callback: Callback<T>): Promise<void>;
  /**
   * Adds [default actors](#api-rest-api-2-resolution-get) to a role. You may add groups or users, but you cannot add groups and users in the same request.
   *
   * Changing a project role's default actors does not affect project role members for projects already created.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: Parameters.AddProjectRoleActorsToRole, callback?: never): Promise<T>;
  async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: Parameters.AddProjectRoleActorsToRole, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'POST',
      data: {
        user: parameters.user,
        group: parameters.group,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectRoleActors.addProjectRoleActorsToRole' });
  }

  /**
   * Deletes the [default actors](#api-rest-api-2-resolution-get) from a project role. You may delete a group or user, but you cannot delete a group and a user in the same request.
   *
   * Changing a project role's default actors does not affect project role members for projects already created.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: Parameters.DeleteProjectRoleActorsFromRole, callback: Callback<T>): Promise<void>;
  /**
   * Deletes the [default actors](#api-rest-api-2-resolution-get) from a project role. You may delete a group or user, but you cannot delete a group and a user in the same request.
   *
   * Changing a project role's default actors does not affect project role members for projects already created.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: Parameters.DeleteProjectRoleActorsFromRole, callback?: never): Promise<T>;
  async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: Parameters.DeleteProjectRoleActorsFromRole, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'DELETE',
      params: {
        user: parameters.user,
        group: parameters.group,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectRoleActors.deleteProjectRoleActorsFromRole' });
  }
}
