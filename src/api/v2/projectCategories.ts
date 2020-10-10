import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ProjectCategory as ProjectCategoryResponse, UpdatedProjectCategory as UpdatedProjectCategoryResponse } from '../../models/v2';

export class ProjectCategories {
  constructor(private readonly client: Client) { }

  async getAllProjectCategories(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectCategory',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createProjectCategory(parameters?: any, callback?: Callback<ProjectCategoryResponse>): Promise<ProjectCategoryResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectCategory',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectCategoryById(parameters: {
    id: number;
  }, callback?: Callback<ProjectCategoryResponse>): Promise<ProjectCategoryResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateProjectCategory(parameters: {
    id: number;
  }, callback?: Callback<UpdatedProjectCategoryResponse>): Promise<UpdatedProjectCategoryResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeProjectCategory(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/projectCategory/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
