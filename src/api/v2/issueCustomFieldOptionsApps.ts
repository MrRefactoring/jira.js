import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PageBeanIssueFieldOption as PageBeanIssueFieldOptionResponse, IssueFieldOption as IssueFieldOptionResponse } from '../../models/v2';

export class IssueCustomFieldOptionsApps {
  constructor(private readonly client: Client) { }

  async getAllIssueFieldOptions(parameters: {
    startAt?: number;
    maxResults?: number;
    fieldKey: string;
  }, callback?: Callback<PageBeanIssueFieldOptionResponse>): Promise<PageBeanIssueFieldOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createIssueFieldOption(parameters: {
    fieldKey: string;
  }, callback?: Callback<IssueFieldOptionResponse>): Promise<IssueFieldOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getSelectableIssueFieldOptions(parameters: {
    startAt?: number;
    maxResults?: number;
    projectId?: number;
    fieldKey: string;
  }, callback?: Callback<PageBeanIssueFieldOptionResponse>): Promise<PageBeanIssueFieldOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option/suggestions/edit`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getVisibleIssueFieldOptions(parameters: {
    startAt?: number;
    maxResults?: number;
    projectId?: number;
    fieldKey: string;
  }, callback?: Callback<PageBeanIssueFieldOptionResponse>): Promise<PageBeanIssueFieldOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option/suggestions/search`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueFieldOption(parameters: {
    fieldKey: string;
    optionId: number;
  }, callback?: Callback<IssueFieldOptionResponse>): Promise<IssueFieldOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateIssueFieldOption(parameters: {
    fieldKey: string;
    optionId: number;
  }, callback?: Callback<IssueFieldOptionResponse>): Promise<IssueFieldOptionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueFieldOption(parameters: {
    fieldKey: string;
    optionId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async replaceIssueFieldOption(parameters: {
    replaceWith?: number;
    jql?: string;
    fieldKey: string;
    optionId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}/issue`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
