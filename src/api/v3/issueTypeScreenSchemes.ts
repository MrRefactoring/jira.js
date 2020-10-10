import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import {
  PageBeanIssueTypeScreenScheme as PageBeanIssueTypeScreenSchemeResponse, IssueTypeScreenSchemeId as IssueTypeScreenSchemeIdResponse, PageBeanIssueTypeScreenSchemeItem as PageBeanIssueTypeScreenSchemeItemResponse, PageBeanIssueTypeScreenSchemesProjects as PageBeanIssueTypeScreenSchemesProjectsResponse,
} from '../../models/v3';

export class IssueTypeScreenSchemes {
  constructor(private readonly client: Client) { }

  async getIssueTypeScreenSchemes(parameters?: {
    startAt?: number;
    maxResults?: number;
    id?: number[];
  }, callback?: Callback<PageBeanIssueTypeScreenSchemeResponse>): Promise<PageBeanIssueTypeScreenSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createIssueTypeScreenScheme(parameters?: any, callback?: Callback<IssueTypeScreenSchemeIdResponse>): Promise<IssueTypeScreenSchemeIdResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueTypeScreenSchemeMappings(parameters?: {
    startAt?: number;
    maxResults?: number;
    issueTypeScreenSchemeId?: number[];
  }, callback?: Callback<PageBeanIssueTypeScreenSchemeItemResponse>): Promise<PageBeanIssueTypeScreenSchemeItemResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme/mapping',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueTypeScreenSchemeProjectAssociations(parameters?: {
    startAt?: number;
    maxResults?: number;
    projectId?: number[];
  }, callback?: Callback<PageBeanIssueTypeScreenSchemesProjectsResponse>): Promise<PageBeanIssueTypeScreenSchemesProjectsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme/project',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async assignIssueTypeScreenSchemeToProject(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme/project',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
