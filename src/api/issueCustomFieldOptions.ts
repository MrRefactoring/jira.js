import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueCustomFieldOptions {
  constructor(private readonly client: Sender) { }

  public async getOptionsForField(
    params: {
      fieldId: number;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${params.fieldId}/option`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateCustomFieldOptions(
    params: {
      fieldId: number;
      options?: Array<any>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${params.fieldId}/option`,
      method: 'PUT',
      data: {
        options: params.options
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createCustomFieldOptions(
    params: {
      fieldId: number;
      options?: Array<any>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customField/${params.fieldId}/option`,
      method: 'POST',
      data: {
        options: params.options
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getCustomFieldOption(
    params: {
      id: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/customFieldOption/${params.id}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }
}
