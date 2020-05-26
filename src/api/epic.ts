import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Epic {
  constructor(private readonly client: Sender) { }

  public async getIssuesWithoutEpic(
    params?: {
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: Array<string>;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/agile/1.0/epic/none/issue',
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

  public async removeIssuesFromEpic(
    params: {
      issues: Array<string>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/agile/1.0/epic/none/issue',
      method: 'POST',
      data: { ...params },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getEpic(
    params: {
      epicIdOrKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/epic/${params.epicIdOrKey}`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async partiallyUpdateEpic(
    params: {
      epicIdOrKey: string;
      name?: string;
      summary?: string;
      color?: {
        key: 'color_1' | 'color_2' | 'color_3' | 'color_4' | 'color_5' | 'color_6' | 'color_7' | 'color_8' | 'color_9' | 'color_10' | 'color_11' | 'color_12' | 'color_13' | 'color_14';
      };
      done?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/epic/${params.epicIdOrKey}`,
      method: 'POST',
      data: { ...params, epicIdOrKey: undefined },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getIssuesForEpic(
    params: {
      epicIdOrKey: string;
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
      url: `/rest/agile/1.0/epic/${params.epicIdOrKey}/issue`,
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

  public async moveIssuesToEpic(
    params: {
      epicIdOrKey: string;
      issues: Array<string>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/epic/${params.epicIdOrKey}/issue`,
      method: 'POST',
      data: { ...params, epicIdOrKey: undefined },
    };
    return this.client.sendRequest(request, callback);
  }

  public async rankEpics(
    params: {
      epicIdOrKey: string;
      rankBeforeEpic?: string;
      rankAfterEpic?: string;
      rankCustomFieldId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/epic/${params.epicIdOrKey}/rank`,
      method: 'PUT',
      data: { ...params, epicIdOrKey: undefined },
    };
    return this.client.sendRequest(request, callback);
  }
}
