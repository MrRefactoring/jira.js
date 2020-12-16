import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueWorklogProperties {
  constructor(private client: Client) { }
  async getWorklogPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetWorklogPropertyKeys, callback: Callback<T>): Promise<void>;
  async getWorklogPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetWorklogPropertyKeys, callback?: undefined): Promise<T>;
  async getWorklogPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetWorklogPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorklogProperty<T = Models.EntityProperty>(parameters: Parameters.GetWorklogProperty, callback: Callback<T>): Promise<void>;
  async getWorklogProperty<T = Models.EntityProperty>(parameters: Parameters.GetWorklogProperty, callback?: undefined): Promise<T>;
  async getWorklogProperty<T = Models.EntityProperty>(parameters: Parameters.GetWorklogProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setWorklogProperty<T = any>(parameters: Parameters.SetWorklogProperty, callback: Callback<T>): Promise<void>;
  async setWorklogProperty<T = any>(parameters: Parameters.SetWorklogProperty, callback?: undefined): Promise<T>;
  async setWorklogProperty<T = any>(parameters: Parameters.SetWorklogProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorklogProperty<T = any>(parameters: Parameters.DeleteWorklogProperty, callback: Callback<T>): Promise<void>;
  async deleteWorklogProperty<T = any>(parameters: Parameters.DeleteWorklogProperty, callback?: undefined): Promise<T>;
  async deleteWorklogProperty<T = any>(parameters: Parameters.DeleteWorklogProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
