import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectProperties {
  constructor(private client: Client) { }
  async getProjectPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetProjectPropertyKeys, callback: Callback<T>): Promise<void>;
  async getProjectPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetProjectPropertyKeys, callback?: undefined): Promise<T>;
  async getProjectPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetProjectPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectProperty<T = Models.EntityProperty>(parameters: Parameters.GetProjectProperty, callback: Callback<T>): Promise<void>;
  async getProjectProperty<T = Models.EntityProperty>(parameters: Parameters.GetProjectProperty, callback?: undefined): Promise<T>;
  async getProjectProperty<T = Models.EntityProperty>(parameters: Parameters.GetProjectProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setProjectProperty<T = any>(parameters: Parameters.SetProjectProperty, callback: Callback<T>): Promise<void>;
  async setProjectProperty<T = any>(parameters: Parameters.SetProjectProperty, callback?: undefined): Promise<T>;
  async setProjectProperty<T = any>(parameters: Parameters.SetProjectProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteProjectProperty<T = void>(parameters: Parameters.DeleteProjectProperty, callback: Callback<T>): Promise<void>;
  async deleteProjectProperty<T = void>(parameters: Parameters.DeleteProjectProperty, callback?: undefined): Promise<T>;
  async deleteProjectProperty<T = void>(parameters: Parameters.DeleteProjectProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
