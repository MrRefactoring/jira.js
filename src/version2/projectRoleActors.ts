import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectRoleActors {
  constructor(private client: Client) { }
  async addActorUsers<T = Models.ProjectRole>(parameters: Parameters.AddActorUsers, callback: Callback<T>): Promise<void>;
  async addActorUsers<T = Models.ProjectRole>(parameters: Parameters.AddActorUsers, callback?: undefined): Promise<T>;
  async addActorUsers<T = Models.ProjectRole>(parameters: Parameters.AddActorUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'POST',
      data: {
        user: parameters.user,
        group: parameters.group,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setActors<T = Models.ProjectRole>(parameters: Parameters.SetActors, callback: Callback<T>): Promise<void>;
  async setActors<T = Models.ProjectRole>(parameters: Parameters.SetActors, callback?: undefined): Promise<T>;
  async setActors<T = Models.ProjectRole>(parameters: Parameters.SetActors, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'PUT',
      data: {
        categorisedActors: parameters.categorisedActors,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteActor<T = void>(parameters: Parameters.DeleteActor, callback: Callback<T>): Promise<void>;
  async deleteActor<T = void>(parameters: Parameters.DeleteActor, callback?: undefined): Promise<T>;
  async deleteActor<T = void>(parameters: Parameters.DeleteActor, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'DELETE',
      params: {
        user: parameters.user,
        group: parameters.group,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleActorsForRole, callback: Callback<T>): Promise<void>;
  async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleActorsForRole, callback?: undefined): Promise<T>;
  async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleActorsForRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: Parameters.AddProjectRoleActorsToRole, callback: Callback<T>): Promise<void>;
  async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: Parameters.AddProjectRoleActorsToRole, callback?: undefined): Promise<T>;
  async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: Parameters.AddProjectRoleActorsToRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'POST',
      data: {
        user: parameters.user,
        group: parameters.group,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: Parameters.DeleteProjectRoleActorsFromRole, callback: Callback<T>): Promise<void>;
  async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: Parameters.DeleteProjectRoleActorsFromRole, callback?: undefined): Promise<T>;
  async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: Parameters.DeleteProjectRoleActorsFromRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'DELETE',
      params: {
        user: parameters.user,
        group: parameters.group,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
