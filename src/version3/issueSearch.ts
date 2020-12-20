import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueSearch {
  constructor(private client: Client) { }
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters?: Parameters.GetIssuePickerResource, callback?: Callback<T>): Promise<void>;
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters?: Parameters.GetIssuePickerResource, callback?: undefined): Promise<T>;
  async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters?: Parameters.GetIssuePickerResource, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issue/picker',
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
  async matchIssues<T = Models.IssueMatches>(parameters?: Parameters.MatchIssues, callback?: Callback<T>): Promise<void>;
  async matchIssues<T = Models.IssueMatches>(parameters?: Parameters.MatchIssues, callback?: undefined): Promise<T>;
  async matchIssues<T = Models.IssueMatches>(parameters?: Parameters.MatchIssues, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/jql/match',
      method: 'POST',
      data: {
        jqls: parameters?.jqls,
        issueIds: parameters?.issueIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async searchForIssuesUsingJql<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJql, callback?: Callback<T>): Promise<void>;
  async searchForIssuesUsingJql<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJql, callback?: undefined): Promise<T>;
  async searchForIssuesUsingJql<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJql, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/search',
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
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJqlPost, callback?: Callback<T>): Promise<void>;
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJqlPost, callback?: undefined): Promise<T>;
  async searchForIssuesUsingJqlPost<T = Models.SearchResults>(parameters?: Parameters.SearchForIssuesUsingJqlPost, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/search',
      method: 'POST',
      data: {
        jql: parameters?.jql,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        fields: parameters?.fields,
        validateQuery: parameters?.validateQuery,
        expand: parameters?.expand,
        properties: parameters?.properties,
        fieldsByKeys: parameters?.fieldsByKeys,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
