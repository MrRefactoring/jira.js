import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ProjectRole as ProjectRoleResponse } from '../../models/v2';

export class ProjectRoleActors {
  constructor(private readonly client: Client) { }

  async getProjectRoleActorsForRole(parameters: {
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addProjectRoleActorsToRole(parameters: {
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteProjectRoleActorsFromRole(parameters: {
    id: number;
    user?: string;
    group?: string;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${parameters.id}/actors`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
