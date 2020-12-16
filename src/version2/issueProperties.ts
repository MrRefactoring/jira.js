import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueProperties {
  constructor(private client: Client) { }
  async bulkSetIssuesProperties<T = any>(callback?: Callback<T>): Promise<void>;
  async bulkSetIssuesProperties<T = any>(callback?: undefined): Promise<T>;
  async bulkSetIssuesProperties<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issue/properties',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async bulkSetIssueProperty<T = any>(parameters: Parameters.BulkSetIssueProperty, callback: Callback<T>): Promise<void>;
  async bulkSetIssueProperty<T = any>(parameters: Parameters.BulkSetIssueProperty, callback?: undefined): Promise<T>;
  async bulkSetIssueProperty<T = any>(parameters: Parameters.BulkSetIssueProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async bulkDeleteIssueProperty<T = any>(parameters: Parameters.BulkDeleteIssueProperty, callback: Callback<T>): Promise<void>;
  async bulkDeleteIssueProperty<T = any>(parameters: Parameters.BulkDeleteIssueProperty, callback?: undefined): Promise<T>;
  async bulkDeleteIssueProperty<T = any>(parameters: Parameters.BulkDeleteIssueProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssuePropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetIssuePropertyKeys, callback: Callback<T>): Promise<void>;
  async getIssuePropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetIssuePropertyKeys, callback?: undefined): Promise<T>;
  async getIssuePropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetIssuePropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueProperty<T = Models.EntityProperty>(parameters: Parameters.GetIssueProperty, callback: Callback<T>): Promise<void>;
  async getIssueProperty<T = Models.EntityProperty>(parameters: Parameters.GetIssueProperty, callback?: undefined): Promise<T>;
  async getIssueProperty<T = Models.EntityProperty>(parameters: Parameters.GetIssueProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setIssueProperty<T = any>(parameters: Parameters.SetIssueProperty, callback: Callback<T>): Promise<void>;
  async setIssueProperty<T = any>(parameters: Parameters.SetIssueProperty, callback?: undefined): Promise<T>;
  async setIssueProperty<T = any>(parameters: Parameters.SetIssueProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueProperty<T = any>(parameters: Parameters.DeleteIssueProperty, callback: Callback<T>): Promise<void>;
  async deleteIssueProperty<T = any>(parameters: Parameters.DeleteIssueProperty, callback?: undefined): Promise<T>;
  async deleteIssueProperty<T = any>(parameters: Parameters.DeleteIssueProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
