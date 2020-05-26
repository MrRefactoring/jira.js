import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class Sprint {
  constructor(private readonly client: Sender) { }

  public async createSprint(
    params?: {
      name?: string;
      startDate?: string;
      endDate?: string;
      originBoardId?: number;
      goal?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/agile/1.0/sprint',
      method: 'POST',
      data: { ...params },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getSprint(
    params: {
      sprintId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateSprint(
    params: {
      sprintId: number;
      id?: number;
      self?: string;
      state?: string;
      name?: string;
      startDate?: string;
      endDate?: string;
      completeDate?: string;
      originBoardId?: number;
      goal?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}`,
      method: 'PUT',
      data: { ...params, sprintId: undefined },
    };
    return this.client.sendRequest(request, callback);
  }

  public async partiallyUpdateSprint(
    params: {
      sprintId: number;
      id?: number;
      self?: string;
      state?: string;
      name?: string;
      startDate?: string;
      endDate?: string;
      completeDate?: string;
      originBoardId?: number;
      goal?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}`,
      method: 'POST',
      data: { ...params, sprintId: undefined },
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteSprint(
    params: {
      sprintId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}`,
      method: 'DELETE',
    };
    return this.client.sendRequest(request, callback);
  }

  public async getIssuesForSprint(
    params: {
      sprintId: number;
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: Array<string>;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}/issue`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        jql: params.jql,
        validateQuery: params.validateQuery,
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async moveIssuesToSprintAndRank(
    params: {
      sprintId: number;
      issues?: Array<string>;
      rankBeforeIssue?: string;
      rankAfterIssue?: string;
      rankCustomFieldId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}/issue`,
      method: 'POST',
      data: { ...params, sprintId: undefined },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getPropertiesKeys(
    params: {
      sprintId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}/properties`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProperty(
    params: {
      sprintId: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}/properties/${params.propertyKey}`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async setProperty(
    params: {
      sprintId: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}/properties/${params.propertyKey}`,
      method: 'PUT',
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteProperty(
    params: {
      sprintId: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}/properties/${params.propertyKey}`,
      method: 'DELETE',
    };
    return this.client.sendRequest(request, callback);
  }

  public async swapSprint(
    params: {
      sprintId: number;
      sprintToSwapWith?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/sprint/${params.sprintId}/swap`,
      method: 'POST',
      data: { ...params, sprintId: undefined },
    };
    return this.client.sendRequest(request, callback);
  }
}
