import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PageBeanCustomFieldContextOption as PageBeanCustomFieldContextOptionResponse, PageBeanCustomFieldOptionDetails as PageBeanCustomFieldOptionDetailsResponse, CustomFieldOption as CustomFieldOptionResponse } from '../../models/v2';

export class IssueCustomFieldOptions {
  constructor(private readonly client: Client) { }

  async getOptionsForContext(parameters: {
    fieldId: number;
    contextId: number;
    optionId?: number;
    onlyOptions?: boolean;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanCustomFieldContextOptionResponse>): Promise<PageBeanCustomFieldContextOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async reorderCustomFieldOptions(parameters: {
    fieldId: number;
    contextId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/context/${parameters.contextId}/option/move`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteCustomFieldOption(parameters: {
    fieldId: number;
    contextId: number;
    optionId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getOptionsForField(parameters: {
    fieldId: number;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanCustomFieldOptionDetailsResponse>): Promise<PageBeanCustomFieldOptionDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createCustomFieldOptions(parameters: {
    fieldId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateCustomFieldOptions(parameters: {
    fieldId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getCustomFieldOption(parameters: {
    id: string;
  }, callback?: Callback<CustomFieldOptionResponse>): Promise<CustomFieldOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customFieldOption/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
