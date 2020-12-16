import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectTypes {
  constructor(private client: Client) { }
  async getAllProjectTypes<T = any>(callback?: Callback<T>): Promise<void>;
  async getAllProjectTypes<T = any>(callback?: undefined): Promise<T>;
  async getAllProjectTypes<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/project/type',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllAccessibleProjectTypes<T = any>(callback?: Callback<T>): Promise<void>;
  async getAllAccessibleProjectTypes<T = any>(callback?: undefined): Promise<T>;
  async getAllAccessibleProjectTypes<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/project/type/accessible',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectTypeByKey<T = Models.ProjectType>(parameters: Parameters.GetProjectTypeByKey, callback: Callback<T>): Promise<void>;
  async getProjectTypeByKey<T = Models.ProjectType>(parameters: Parameters.GetProjectTypeByKey, callback?: undefined): Promise<T>;
  async getProjectTypeByKey<T = Models.ProjectType>(parameters: Parameters.GetProjectTypeByKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/type/${parameters.projectTypeKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAccessibleProjectTypeByKey<T = Models.ProjectType>(parameters: Parameters.GetAccessibleProjectTypeByKey, callback: Callback<T>): Promise<void>;
  async getAccessibleProjectTypeByKey<T = Models.ProjectType>(parameters: Parameters.GetAccessibleProjectTypeByKey, callback?: undefined): Promise<T>;
  async getAccessibleProjectTypeByKey<T = Models.ProjectType>(parameters: Parameters.GetAccessibleProjectTypeByKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/type/${parameters.projectTypeKey}/accessible`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
