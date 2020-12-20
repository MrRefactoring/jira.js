import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectCategories {
  constructor(private client: Client) { }
  async getAllProjectCategories<T = any>(callback?: Callback<T>): Promise<void>;
  async getAllProjectCategories<T = any>(callback?: undefined): Promise<T>;
  async getAllProjectCategories<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/projectCategory',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createProjectCategory<T = any>(parameters?: Parameters.CreateProjectCategory, callback?: Callback<T>): Promise<void>;
  async createProjectCategory<T = any>(parameters?: Parameters.CreateProjectCategory, callback?: undefined): Promise<T>;
  async createProjectCategory<T = any>(parameters?: Parameters.CreateProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/projectCategory',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback: Callback<T>): Promise<void>;
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback?: undefined): Promise<T>;
  async getProjectCategoryById<T = Models.ProjectCategory>(parameters: Parameters.GetProjectCategoryById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback: Callback<T>): Promise<void>;
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback?: undefined): Promise<T>;
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: Parameters.UpdateProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeProjectCategory<T = any>(parameters: Parameters.RemoveProjectCategory, callback: Callback<T>): Promise<void>;
  async removeProjectCategory<T = any>(parameters: Parameters.RemoveProjectCategory, callback?: undefined): Promise<T>;
  async removeProjectCategory<T = any>(parameters: Parameters.RemoveProjectCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
