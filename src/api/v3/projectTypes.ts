import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { ProjectType as ProjectTypeResponse } from '../../models/v3';

export class ProjectTypes {
  constructor(private readonly client: Client) { }

  async getAllProjectTypes(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/project/type',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllAccessibleProjectTypes(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/project/type/accessible',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectTypeByKey(parameters: {
    projectTypeKey: string;
  }, callback?: Callback<ProjectTypeResponse>): Promise<ProjectTypeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/type/${parameters.projectTypeKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAccessibleProjectTypeByKey(parameters: {
    projectTypeKey: string;
  }, callback?: Callback<ProjectTypeResponse>): Promise<ProjectTypeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/type/${parameters.projectTypeKey}/accessible`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
