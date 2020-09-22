import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class IssueTypeScreenSchemes {
  constructor(private readonly client: Sender) {}

  public async getIssueTypeScreenSchemes(
    params?: {
      startAt?: number;
      maxResults?: number;
      id?: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescreenscheme',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        id: params.id && params.id.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypeScreenSchemeItems(
    params?: {
      startAt?: number;
      maxResults?: number;
      issueTypeScreenSchemeId?: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescreenscheme/mapping',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        issueTypeScreenSchemeId:
          params.issueTypeScreenSchemeId
          && params.issueTypeScreenSchemeId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypeScreenSchemesForProjects(
    params?: {
      startAt?: number;
      maxResults?: number;
      projectId?: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        projectId: params.projectId && params.projectId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async assignIssueTypeScreenSchemeToProject(
    params?: {
      issueTypeScreenSchemeId?: string;
      projectId?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'PUT',
      data: {
        issueTypeScreenSchemeId: params.issueTypeScreenSchemeId,
        projectId: params.projectId,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
