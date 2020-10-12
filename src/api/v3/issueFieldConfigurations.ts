import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  PageBeanFieldConfiguration as PageBeanFieldConfigurationResponse, PageBeanFieldConfigurationItem as PageBeanFieldConfigurationItemResponse, PageBeanFieldConfigurationScheme as PageBeanFieldConfigurationSchemeResponse, PageBeanFieldConfigurationIssueTypeItem as PageBeanFieldConfigurationIssueTypeItemResponse, PageBeanFieldConfigurationSchemeProjects as PageBeanFieldConfigurationSchemeProjectsResponse,
} from '../../models/v3';

export class IssueFieldConfigurations {
  constructor(private readonly client: Client) { }

  async getAllFieldConfigurations(parameters?: {
    startAt?: number;
    maxResults?: number;
    id?: number[];
    isDefault?: boolean;
  }, callback?: Callback<PageBeanFieldConfigurationResponse>): Promise<PageBeanFieldConfigurationResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/fieldconfiguration',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFieldConfigurationItems(parameters: {
    id: number;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanFieldConfigurationItemResponse>): Promise<PageBeanFieldConfigurationItemResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/fieldconfiguration/${parameters.id}/fields`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllFieldConfigurationSchemes(parameters?: {
    startAt?: number;
    maxResults?: number;
    id?: number[];
  }, callback?: Callback<PageBeanFieldConfigurationSchemeResponse>): Promise<PageBeanFieldConfigurationSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFieldConfigurationSchemeMappings(parameters?: {
    startAt?: number;
    maxResults?: number;
    fieldConfigurationSchemeId?: number[];
  }, callback?: Callback<PageBeanFieldConfigurationIssueTypeItemResponse>): Promise<PageBeanFieldConfigurationIssueTypeItemResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme/mapping',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFieldConfigurationSchemeProjectMapping(parameters: {
    startAt?: number;
    maxResults?: number;
    projectId: number[];
  }, callback?: Callback<PageBeanFieldConfigurationSchemeProjectsResponse>): Promise<PageBeanFieldConfigurationSchemeProjectsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme/project',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async assignFieldConfigurationSchemeToProject(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme/project',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
