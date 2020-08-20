import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { ProjectCategory, UpdatedProjectCategory } from '../schemas';
export class ProjectCategories {
  constructor(private readonly client: Sender) {}

  public async getAllProjectCategories(callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectCategory',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async createProjectCategory(
    params?: {
      self?: string;
      id?: string;
      name?: string;
      description?: string;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectCategory',
      method: 'POST',
      data: {
        self: params.self,
        id: params.id,
        name: params.name,
        description: params.description,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getProjectCategoryById(
    params: {
      id: number;
    },
    callback?: Callback<ProjectCategory>,
  ): Promise<ProjectCategory> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/projectCategory/${params.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateProjectCategory(
    params: {
      id: number;
      self?: string;
      name?: string;
      description?: string;
    },
    callback?: Callback<UpdatedProjectCategory>,
  ): Promise<UpdatedProjectCategory> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/projectCategory/${params.id}`,
      method: 'PUT',
      data: {
        self: params.self,
        id: params.id,
        name: params.name,
        description: params.description,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteProjectCategory(
    params: {
      id: number;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/projectCategory/${params.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
