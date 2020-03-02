import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueSearch {
  constructor(private readonly client: Sender) { }

  public async getIssuePickerSuggestions(
    params?: {
      query?: string;
      currentJQL?: string;
      currentIssueKey?: string;
      currentProjectId?: string;
      showSubTasks?: boolean;
      showSubTaskParent?: boolean;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issue/picker',
      method: 'GET',
      params: {
        query: params.query,
        currentJQL: params.currentJQL,
        currentIssueKey: params.currentIssueKey,
        currentProjectId: params.currentProjectId,
        showSubTasks: params.showSubTasks,
        showSubTaskParent: params.showSubTaskParent
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async checkIssuesAgainstJql(
    params: {
      jqls: Array<string>;
      issueIds: Array<number>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/jql/match',
      method: 'POST',
      data: {
        jqls: params.jqls,
        issueIds: params.issueIds
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async searchForIssuesUsingJqlGet(
    params?: {
      jql?: string;
      startAt?: number;
      maxResults?: number;
      validateQuery?: string;
      fields?: Array<string>;
      expand?: string;
      properties?: Array<string>;
      fieldsByKeys?: boolean;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/search',
      method: 'GET',
      params: {
        jql: params.jql,
        startAt: params.startAt,
        maxResults: params.maxResults,
        validateQuery: params.validateQuery,
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
        properties: params.properties && params.properties.join(','),
        fieldsByKeys: params.fieldsByKeys
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async searchForIssuesUsingJqlPost(
    params?: {
      jql?: string;
      startAt?: number;
      maxResults?: number;
      fields?: Array<string>;
      validateQuery?: string;
      expand?: Array<string>;
      properties?: Array<string>;
      fieldsByKeys?: boolean;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/search',
      method: 'POST',
      data: {
        jql: params.jql,
        startAt: params.startAt,
        maxResults: params.maxResults,
        fields: params.fields,
        validateQuery: params.validateQuery,
        expand: params.expand,
        properties: params.properties,
        fieldsByKeys: params.fieldsByKeys
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
