import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueTypeSchemes {
  constructor(private readonly client: Sender) {}

  public async getAllIssueTypeSchemes(
    params?: {
      startAt?: number;
      maxResults?: number;
      id?: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescheme',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        id: params.id && params.id.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createIssueTypeScheme(
    params: {
      name: string;
      description?: string;
      defaultIssueTypeId?: string;
      issueTypeIds: Array<string>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescheme',
      method: 'POST',
      data: {
        name: params.name,
        description: params.description,
        defaultIssueTypeId: params.defaultIssueTypeId,
        issueTypeIds: params.issueTypeIds,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypeSchemeItems(
    params?: {
      startAt?: number;
      maxResults?: number;
      issueTypeSchemeId?: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescheme/mapping',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        issueTypeSchemeId:
          params.issueTypeSchemeId && params.issueTypeSchemeId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypeSchemesForProjects(
    params: {
      startAt?: number;
      maxResults?: number;
      projectId: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescheme/project',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        projectId: params.projectId && params.projectId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async assignIssueTypeSchemeToProject(
    params: {
      issueTypeSchemeId: string;
      projectId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescheme/project',
      method: 'PUT',
      data: {
        issueTypeSchemeId: params.issueTypeSchemeId,
        projectId: params.projectId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateIssueTypeScheme(
    params: {
      issueTypeSchemeId: number;
      name?: string;
      description?: string;
      defaultIssueTypeId?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetypescheme/${params.issueTypeSchemeId}`,
      method: 'PUT',
      data: {
        name: params.name,
        description: params.description,
        defaultIssueTypeId: params.defaultIssueTypeId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueTypeScheme(
    params: {
      issueTypeSchemeId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetypescheme/${params.issueTypeSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async addIssueTypesToIssueTypeScheme(
    params: {
      issueTypeSchemeId: number;
      issueTypeIds: Array<string>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetypescheme/${params.issueTypeSchemeId}/issuetype`,
      method: 'PUT',
      data: {
        issueTypeIds: params.issueTypeIds,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueTypeFromIssueTypeScheme(
    params: {
      issueTypeSchemeId: number;
      issueTypeId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetypescheme/${params.issueTypeSchemeId}/issuetype/${params.issueTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
