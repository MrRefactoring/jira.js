import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectEmail {
  constructor(private client: Client) { }
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback: Callback<T>): Promise<void>;
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback?: undefined): Promise<T>;
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectId}/email`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateProjectEmail<T = any>(parameters: Parameters.UpdateProjectEmail, callback: Callback<T>): Promise<void>;
  async updateProjectEmail<T = any>(parameters: Parameters.UpdateProjectEmail, callback?: undefined): Promise<T>;
  async updateProjectEmail<T = any>(parameters: Parameters.UpdateProjectEmail, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectId}/email`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
