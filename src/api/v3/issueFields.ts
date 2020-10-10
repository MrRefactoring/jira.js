import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { FieldDetails as FieldDetailsResponse, PageBeanField as PageBeanFieldResponse, PageBeanContext as PageBeanContextResponse } from '../../models/v3';

export class IssueFields {
  constructor(private readonly client: Client) { }

  async getFields(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/field',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createCustomField(parameters?: any, callback?: Callback<FieldDetailsResponse>): Promise<FieldDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/field',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFieldsPaginated(parameters?: {
    startAt?: number;
    maxResults?: number;
    type?: string[];
    id?: string[];
    query?: string;
    orderBy?: string;
    expand?: string;
  }, callback?: Callback<PageBeanFieldResponse>): Promise<PageBeanFieldResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/field/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getContextsForField(parameters: {
    fieldId: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanContextResponse>): Promise<PageBeanContextResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/contexts`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
