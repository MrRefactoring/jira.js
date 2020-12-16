import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypeProperties {
  constructor(private client: Client) { }
  async getIssueTypePropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetIssueTypePropertyKeys, callback: Callback<T>): Promise<void>;
  async getIssueTypePropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetIssueTypePropertyKeys, callback?: undefined): Promise<T>;
  async getIssueTypePropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetIssueTypePropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueTypeProperty<T = Models.EntityProperty>(parameters: Parameters.GetIssueTypeProperty, callback: Callback<T>): Promise<void>;
  async getIssueTypeProperty<T = Models.EntityProperty>(parameters: Parameters.GetIssueTypeProperty, callback?: undefined): Promise<T>;
  async getIssueTypeProperty<T = Models.EntityProperty>(parameters: Parameters.GetIssueTypeProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setIssueTypeProperty<T = any>(parameters: Parameters.SetIssueTypeProperty, callback: Callback<T>): Promise<void>;
  async setIssueTypeProperty<T = any>(parameters: Parameters.SetIssueTypeProperty, callback?: undefined): Promise<T>;
  async setIssueTypeProperty<T = any>(parameters: Parameters.SetIssueTypeProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueTypeProperty<T = any>(parameters: Parameters.DeleteIssueTypeProperty, callback: Callback<T>): Promise<void>;
  async deleteIssueTypeProperty<T = any>(parameters: Parameters.DeleteIssueTypeProperty, callback?: undefined): Promise<T>;
  async deleteIssueTypeProperty<T = any>(parameters: Parameters.DeleteIssueTypeProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
