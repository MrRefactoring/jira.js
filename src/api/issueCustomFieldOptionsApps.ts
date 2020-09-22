import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class IssueCustomFieldOptionsApps {
  constructor(private readonly client: Sender) {}

  public async getAllIssueFieldOptions(
    params: {
      startAt?: number;
      maxResults?: number;
      fieldKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createIssueFieldOption(
    params: {
      fieldKey: string;
      value: string;
      properties?: any;
      config?: any;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option`,
      method: 'POST',
      data: { ...params, fieldKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getSelectableIssueFieldOptions(
    params: {
      startAt?: number;
      maxResults?: number;
      projectId?: number;
      fieldKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option/suggestions/edit`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        projectId: params.projectId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getVisibleIssueFieldOptions(
    params: {
      startAt?: number;
      maxResults?: number;
      projectId?: number;
      fieldKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option/suggestions/search`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        projectId: params.projectId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueFieldOption(
    params: {
      fieldKey: string;
      optionId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option/${params.optionId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateIssueFieldOption(
    params: {
      fieldKey: string;
      optionId: number;
      id: number;
      value: string;
      properties?: any;
      config?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option/${params.optionId}`,
      method: 'PUT',
      data: {
        id: params.id,
        value: params.value,
        properties: params.properties,
        config: params.config,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueFieldOption(
    params: {
      fieldKey: string;
      optionId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option/${params.optionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async replaceIssueFieldOption(
    params: {
      replaceWith?: number;
      jql?: string;
      fieldKey: string;
      optionId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldKey}/option/${params.optionId}/issue`,
      method: 'DELETE',
      params: {
        replaceWith: params.replaceWith,
        jql: params.jql,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
