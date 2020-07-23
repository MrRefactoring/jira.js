import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueFieldConfigurations {
  constructor(private readonly client: Sender) {}

  public async getAllFieldConfigurations(
    params?: {
      startAt?: number;
      maxResults?: number;
      isDefault?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/fieldconfiguration',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        isDefault: params.isDefault,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFieldConfigurationItems(
    params: {
      id: number;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/fieldconfiguration/${params.id}/fields`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllFieldConfigurationSchemes(
    params?: {
      startAt?: number;
      maxResults?: number;
      id?: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        id: params.id && params.id.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFieldConfigurationIssueTypeItems(
    params?: {
      startAt?: number;
      maxResults?: number;
      fieldConfigurationSchemeId?: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme/mapping',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        fieldConfigurationSchemeId:
          params.fieldConfigurationSchemeId &&
          params.fieldConfigurationSchemeId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFieldConfigurationSchemesForProjects(
    params: {
      startAt?: number;
      maxResults?: number;
      projectId: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme/project',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        projectId: params.projectId && params.projectId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async assignFieldConfigurationSchemeToProject(
    params: {
      fieldConfigurationSchemeId?: string;
      projectId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme/project',
      method: 'PUT',
      data: {
        fieldConfigurationSchemeId: params.fieldConfigurationSchemeId,
        projectId: params.projectId,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
