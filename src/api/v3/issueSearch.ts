import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { IssuePickerSuggestions as IssuePickerSuggestionsResponse, IssueMatches as IssueMatchesResponse, SearchResults as SearchResultsResponse } from '../../models/v3';

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
      url: '/rest/api/3/issue/picker',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async matchIssues(parameters?: any, callback?: Callback<IssueMatchesResponse>): Promise<IssueMatchesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/jql/match',
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
      url: '/rest/api/3/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async searchForIssuesUsingJqlPost(parameters?: any, callback?: Callback<SearchResultsResponse>): Promise<SearchResultsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/search',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
