import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  PageBeanIssueTypeScheme as PageBeanIssueTypeSchemeResponse, IssueTypeSchemeID as IssueTypeSchemeIDResponse, PageBeanIssueTypeSchemeMapping as PageBeanIssueTypeSchemeMappingResponse, PageBeanIssueTypeSchemeProjects as PageBeanIssueTypeSchemeProjectsResponse,
} from '../../models/v3';

export class IssueTypeSchemes {
  constructor(private readonly client: Client) { }

  async getAllIssueTypeSchemes(parameters?: {
    startAt?: number;
    maxResults?: number;
    id?: number[];
  }, callback?: Callback<PageBeanIssueTypeSchemeResponse>): Promise<PageBeanIssueTypeSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createIssueTypeScheme(parameters?: any, callback?: Callback<IssueTypeSchemeIDResponse>): Promise<IssueTypeSchemeIDResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescheme',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueTypeSchemesMapping(parameters?: {
    startAt?: number;
    maxResults?: number;
    issueTypeSchemeId?: number[];
  }, callback?: Callback<PageBeanIssueTypeSchemeMappingResponse>): Promise<PageBeanIssueTypeSchemeMappingResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescheme/mapping',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueTypeSchemeForProjects(parameters: {
    startAt?: number;
    maxResults?: number;
    projectId: number[];
  }, callback?: Callback<PageBeanIssueTypeSchemeProjectsResponse>): Promise<PageBeanIssueTypeSchemeProjectsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescheme/project',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async assignIssueTypeSchemeToProject(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescheme/project',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateIssueTypeScheme(parameters: {
    issueTypeSchemeId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueTypeScheme(parameters: {
    issueTypeSchemeId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async addIssueTypesToIssueTypeScheme(parameters: {
    issueTypeSchemeId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async reorderIssueTypesInIssueTypeScheme(parameters: {
    issueTypeSchemeId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueTypeFromIssueTypeScheme(parameters: {
    issueTypeSchemeId: number;
    issueTypeId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
