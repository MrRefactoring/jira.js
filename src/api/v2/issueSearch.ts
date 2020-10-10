import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { IssuePickerSuggestions as IssuePickerSuggestionsResponse, IssueMatches as IssueMatchesResponse, SearchResults as SearchResultsResponse } from '../../models/v2';

export class IssueSearch {
  constructor(private readonly client: Client) { }

  async getIssuePickerResource(parameters?: {
    query?: string;
    currentJQL?: string;
    currentIssueKey?: string;
    currentProjectId?: string;
    showSubTasks?: boolean;
    showSubTaskParent?: boolean;
  }, callback?: Callback<IssuePickerSuggestionsResponse>): Promise<IssuePickerSuggestionsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issue/picker',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async matchIssues(parameters?: any, callback?: Callback<IssueMatchesResponse>): Promise<IssueMatchesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/jql/match',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async searchForIssuesUsingJql(parameters?: {
    jql?: string;
    startAt?: number;
    maxResults?: number;
    validateQuery?: string;
    fields?: string[];
    expand?: string;
    properties?: string[];
    fieldsByKeys?: boolean;
  }, callback?: Callback<SearchResultsResponse>): Promise<SearchResultsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async searchForIssuesUsingJqlPost(parameters?: any, callback?: Callback<SearchResultsResponse>): Promise<SearchResultsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/search',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
