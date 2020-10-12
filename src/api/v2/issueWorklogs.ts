import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PageOfWorklogs as PageOfWorklogsResponse, Worklog as WorklogResponse, ChangedWorklogs as ChangedWorklogsResponse } from '../../models/v2';

export class IssueWorklogs {
  constructor(private readonly client: Client) { }

  async getIssueWorklog(parameters: {
    issueIdOrKey: string;
    startAt?: number;
    maxResults?: number;
    startedAfter?: number;
    expand?: string;
  }, callback?: Callback<PageOfWorklogsResponse>): Promise<PageOfWorklogsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addWorklog(parameters: {
    issueIdOrKey: string;
    notifyUsers?: boolean;
    adjustEstimate?: string;
    newEstimate?: string;
    reduceBy?: string;
    expand?: string;
    overrideEditableFlag?: boolean;
  }, callback?: Callback<WorklogResponse>): Promise<WorklogResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorklog(parameters: {
    issueIdOrKey: string;
    id: string;
    expand?: string;
  }, callback?: Callback<WorklogResponse>): Promise<WorklogResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateWorklog(parameters: {
    issueIdOrKey: string;
    id: string;
    notifyUsers?: boolean;
    adjustEstimate?: string;
    newEstimate?: string;
    expand?: string;
    overrideEditableFlag?: boolean;
  }, callback?: Callback<WorklogResponse>): Promise<WorklogResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWorklog(parameters: {
    issueIdOrKey: string;
    id: string;
    notifyUsers?: boolean;
    adjustEstimate?: string;
    newEstimate?: string;
    increaseBy?: string;
    overrideEditableFlag?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIdsOfWorklogsDeletedSince(parameters?: {
    since?: number;
  }, callback?: Callback<ChangedWorklogsResponse>): Promise<ChangedWorklogsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/worklog/deleted',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorklogsForIds(parameters?: {
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/worklog/list',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIdsOfWorklogsModifiedSince(parameters?: {
    since?: number;
    expand?: string;
  }, callback?: Callback<ChangedWorklogsResponse>): Promise<ChangedWorklogsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/worklog/updated',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
