import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { ProjectRole as ProjectRoleResponse } from '../../models/v2';

export class ProjectRoles {
  constructor(private readonly client: Client) { }

  async getProjectRoles(parameters: {
    projectIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectRole(parameters: {
    projectIdOrKey: string;
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addActorUsers(parameters: {
    projectIdOrKey: string;
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async setActors(parameters: {
    projectIdOrKey: string;
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteActor(parameters: {
    projectIdOrKey: string;
    id: number;
    user?: string;
    group?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectRoleDetails(parameters: {
    projectIdOrKey: string;
    currentMember?: boolean;
    excludeConnectAddons?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/roledetails`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllProjectRoles(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/role',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createProjectRole(parameters?: any, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/role',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectRoleById(parameters: {
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async partialUpdateProjectRole(parameters: {
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async fullyUpdateProjectRole(parameters: {
    id: number;
  }, callback?: Callback<ProjectRoleResponse>): Promise<ProjectRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteProjectRole(parameters: {
    id: number;
    swap?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
