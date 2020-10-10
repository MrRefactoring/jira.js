import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ProjectEmailAddress as ProjectEmailAddressResponse } from '../../models/v2';

export class ProjectEmail {
  constructor(private readonly client: Client) { }

  async getProjectEmail(parameters: {
    projectId: number;
  }, callback?: Callback<ProjectEmailAddressResponse>): Promise<ProjectEmailAddressResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectId}/email`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateProjectEmail(parameters: {
    projectId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectId}/email`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
