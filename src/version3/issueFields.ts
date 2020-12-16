import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueFields {
  constructor(private client: Client) { }
  async getFields<T = any>(callback?: Callback<T>): Promise<void>;
  async getFields<T = any>(callback?: undefined): Promise<T>;
  async getFields<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/field',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createCustomField<T = any>(callback?: Callback<T>): Promise<void>;
  async createCustomField<T = any>(callback?: undefined): Promise<T>;
  async createCustomField<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/field',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFieldsPaginated<T = Models.PageBeanField>(parameters?: Parameters.GetFieldsPaginated, callback?: Callback<T>): Promise<void>;
  async getFieldsPaginated<T = Models.PageBeanField>(parameters?: Parameters.GetFieldsPaginated, callback?: undefined): Promise<T>;
  async getFieldsPaginated<T = Models.PageBeanField>(parameters?: Parameters.GetFieldsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/field/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        type: parameters?.type,
        id: parameters?.id,
        query: parameters?.query,
        orderBy: parameters?.orderBy,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback: Callback<T>): Promise<void>;
  async getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback?: undefined): Promise<T>;
  async getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/contexts`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
