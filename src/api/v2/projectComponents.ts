import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { Component as ComponentResponse, ComponentIssuesCount as ComponentIssuesCountResponse, PageBeanComponentWithIssueCount as PageBeanComponentWithIssueCountResponse } from '../../models/v2';

export class ProjectComponents {
  constructor(private readonly client: Client) { }

  async createComponent(parameters?: any, callback?: Callback<ComponentResponse>): Promise<ComponentResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/component',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getComponent(parameters: {
    id: string;
  }, callback?: Callback<ComponentResponse>): Promise<ComponentResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateComponent(parameters: {
    id: string;
  }, callback?: Callback<ComponentResponse>): Promise<ComponentResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteComponent(parameters: {
    id: string;
    moveIssuesTo?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getComponentRelatedIssues(parameters: {
    id: string;
  }, callback?: Callback<ComponentIssuesCountResponse>): Promise<ComponentIssuesCountResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectComponentsPaginated(parameters: {
    projectIdOrKey: string;
    startAt?: number;
    maxResults?: number;
    orderBy?: string;
    query?: string;
  }, callback?: Callback<PageBeanComponentWithIssueCountResponse>): Promise<PageBeanComponentWithIssueCountResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/component`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectComponents(parameters: {
    projectIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/components`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
