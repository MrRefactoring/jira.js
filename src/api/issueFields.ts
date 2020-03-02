import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueFields {
  constructor(private readonly client: Sender) { }

  public async getFields(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/field',
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async createCustomField(
    params: {
      name: string;
      description?: string;
      type: string;
      searcherKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/field',
      method: 'POST',
      data: {
        name: params.name,
        description: params.description,
        type: params.type,
        searcherKey: params.searcherKey
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getFieldsPaginated(
    params?: {
      startAt?: number;
      maxResults?: number;
      type?: Array<string>;
      id?: Array<string>;
      query?: string;
      orderBy?: string;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/field/search',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        type: params.type && params.type.join(','),
        id: params.id && params.id.join(','),
        query: params.query,
        orderBy: params.orderBy,
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getContextsForAField(
    params: {
      fieldId: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldId}/contexts`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
