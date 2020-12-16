import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueSearch {
  constructor(private client: Client) { }
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters?: Parameters.GetIssuePickerResource, callback?: Callback<T>): Promise<void>;
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters?: Parameters.GetIssuePickerResource, callback?: undefined): Promise<T>;
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters?: Parameters.GetIssuePickerResource, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issue/picker',
      method: 'GET',
      params: {
        query: parameters?.query,
        currentJQL: parameters?.currentJQL,
        currentIssueKey: parameters?.currentIssueKey,
        currentProjectId: parameters?.currentProjectId,
        showSubTasks: parameters?.showSubTasks,
        showSubTaskParent: parameters?.showSubTaskParent,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async matchIssues<T = Models.IssueMatches>(callback?: Callback<T>): Promise<void>;
  async matchIssues<T = Models.IssueMatches>(callback?: undefined): Promise<T>;
  async matchIssues<T = Models.IssueMatches>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/jql/match',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async searchForIssuesUsingJql<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJql, callback?: Callback<T>): Promise<void>;
  async searchForIssuesUsingJql<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJql, callback?: undefined): Promise<T>;
  async searchForIssuesUsingJql<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJql, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/search',
      method: 'GET',
      params: {
        jql: parameters?.jql,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        validateQuery: parameters?.validateQuery,
        fields: parameters?.fields,
        expand: parameters?.expand,
        properties: parameters?.properties,
        fieldsByKeys: parameters?.fieldsByKeys,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(callback?: Callback<T>): Promise<void>;
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(callback?: undefined): Promise<T>;
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/search',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
