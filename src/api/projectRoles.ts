import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class ProjectRoles {
  constructor(private readonly client: Sender) { }

  public async getProjectRolesForProject(
    params: {
      projectIdOrKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/role`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectRoleForProject(
    params: {
      projectIdOrKey: string;
      id: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/role/${params.id}`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectRoleDetails(
    params: {
      projectIdOrKey: string;
      currentMember?: boolean;
      excludeConnectAddons?: boolean;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/roledetails`,
      method: 'GET',
      params: {
        currentMember: params.currentMember,
        excludeConnectAddons: params.excludeConnectAddons,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllProjectRoles(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/role',
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async createProjectRole(
    params?: {
      name?: string;
      description?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/role',
      method: 'POST',
      data: {
        name: params.name,
        description: params.description,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectRoleById(
    params: {
      id: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${params.id}`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async fullyUpdateProjectRole(
    params: {
      id: number;
      name?: string;
      description?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${params.id}`,
      method: 'PUT',
      data: {
        name: params.name,
        description: params.description,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async partialUpdateProjectRole(
    params: {
      id: number;
      name?: string;
      description?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${params.id}`,
      method: 'POST',
      data: {
        name: params.name,
        description: params.description,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteProjectRole(
    params: {
      id: number;
      swap?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${params.id}`,
      method: 'DELETE',
      params: {
        swap: params.swap,
      },
    };
    return this.client.sendRequest(request, callback);
  }
}
