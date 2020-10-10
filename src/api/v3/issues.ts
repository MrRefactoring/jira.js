import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import {
  CreatedIssue as CreatedIssueResponse, CreatedIssues as CreatedIssuesResponse, IssueCreateMetadata as IssueCreateMetadataResponse, IssueBean as IssueBeanResponse, PageBeanChangelog as PageBeanChangelogResponse, IssueUpdateMetadata as IssueUpdateMetadataResponse, Transitions as TransitionsResponse,
} from '../../models/v3';

export class Issues {
  constructor(private readonly client: Client) { }

  async createIssue(parameters?: {
    updateHistory?: boolean;
  }, callback?: Callback<CreatedIssueResponse>): Promise<CreatedIssueResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issue',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async createIssues(parameters?: any, callback?: Callback<CreatedIssuesResponse>): Promise<CreatedIssuesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issue/bulk',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getCreateIssueMeta(parameters?: {
    projectIds?: string[];
    projectKeys?: string[];
    issuetypeIds?: string[];
    issuetypeNames?: string[];
    expand?: string;
  }, callback?: Callback<IssueCreateMetadataResponse>): Promise<IssueCreateMetadataResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issue/createmeta',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssue(parameters: {
    issueIdOrKey: string;
    fields?: string[];
    fieldsByKeys?: boolean;
    expand?: string;
    properties?: string[];
    updateHistory?: boolean;
  }, callback?: Callback<IssueBeanResponse>): Promise<IssueBeanResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async editIssue(parameters: {
    issueIdOrKey: string;
    notifyUsers?: boolean;
    overrideScreenSecurity?: boolean;
    overrideEditableFlag?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssue(parameters: {
    issueIdOrKey: string;
    deleteSubtasks?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async assignIssue(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/assignee`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getChangeLogs(parameters: {
    issueIdOrKey: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanChangelogResponse>): Promise<PageBeanChangelogResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/changelog`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getEditIssueMeta(parameters: {
    issueIdOrKey: string;
    overrideScreenSecurity?: boolean;
    overrideEditableFlag?: boolean;
  }, callback?: Callback<IssueUpdateMetadataResponse>): Promise<IssueUpdateMetadataResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/editmeta`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async notify(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/notify`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getTransitions(parameters: {
    issueIdOrKey: string;
    expand?: string;
    transitionId?: string;
    skipRemoteOnlyCondition?: boolean;
    includeUnavailableTransitions?: boolean;
    sortByOpsBarAndStatus?: boolean;
  }, callback?: Callback<TransitionsResponse>): Promise<TransitionsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/transitions`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async doTransition(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/transitions`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
