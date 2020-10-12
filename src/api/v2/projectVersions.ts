import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  PageBeanVersion as PageBeanVersionResponse, Version as VersionResponse, VersionIssueCounts as VersionIssueCountsResponse, VersionUnresolvedIssuesCount as VersionUnresolvedIssuesCountResponse,
} from '../../models/v2';

export class ProjectVersions {
  constructor(private readonly client: Client) { }

  async getProjectVersionsPaginated(parameters: {
    projectIdOrKey: string;
    startAt?: number;
    maxResults?: number;
    orderBy?: string;
    query?: string;
    status?: string;
    expand?: string;
  }, callback?: Callback<PageBeanVersionResponse>): Promise<PageBeanVersionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/version`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectVersions(parameters: {
    projectIdOrKey: string;
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/versions`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createVersion(parameters?: any, callback?: Callback<VersionResponse>): Promise<VersionResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/version',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getVersion(parameters: {
    id: string;
    expand?: string;
  }, callback?: Callback<VersionResponse>): Promise<VersionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateVersion(parameters: {
    id: string;
  }, callback?: Callback<VersionResponse>): Promise<VersionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteVersion(parameters: {
    id: string;
    moveFixIssuesTo?: string;
    moveAffectedIssuesTo?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async mergeVersions(parameters: {
    id: string;
    moveIssuesTo: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async moveVersion(parameters: {
    id: string;
  }, callback?: Callback<VersionResponse>): Promise<VersionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}/move`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getVersionRelatedIssues(parameters: {
    id: string;
  }, callback?: Callback<VersionIssueCountsResponse>): Promise<VersionIssueCountsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteAndReplaceVersion(parameters: {
    id: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}/removeAndSwap`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getVersionUnresolvedIssues(parameters: {
    id: string;
  }, callback?: Callback<VersionUnresolvedIssuesCountResponse>): Promise<VersionUnresolvedIssuesCountResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${parameters.id}/unresolvedIssueCount`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
