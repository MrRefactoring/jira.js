import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueFieldConfigurations {
  constructor(private readonly client: Sender) { }

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

  public async getFieldConfigurationIssueTypeItems(
    params: {
      startAt?: number;
      maxResults?: number;
      fieldConfigurationSchemeId: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
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
}
