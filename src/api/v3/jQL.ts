import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  JQLReferenceData as JQLReferenceDataResponse, AutoCompleteSuggestions as AutoCompleteSuggestionsResponse, ParsedJqlQueries as ParsedJqlQueriesResponse, ConvertedJQLQueries as ConvertedJQLQueriesResponse,
} from '../../models/v3';

export class JQL {
  constructor(private readonly client: Client) { }

  async getAutoComplete(parameters?: any, callback?: Callback<JQLReferenceDataResponse>): Promise<JQLReferenceDataResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/jql/autocompletedata',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFieldAutoCompleteForQueryString(parameters?: {
    fieldName?: string;
    fieldValue?: string;
    predicateName?: string;
    predicateValue?: string;
  }, callback?: Callback<AutoCompleteSuggestionsResponse>): Promise<AutoCompleteSuggestionsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/jql/autocompletedata/suggestions',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async parseJqlQueries(parameters?: {
    validation?: string;
  }, callback?: Callback<ParsedJqlQueriesResponse>): Promise<ParsedJqlQueriesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/jql/parse',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async migrateQueries(parameters?: any, callback?: Callback<ConvertedJQLQueriesResponse>): Promise<ConvertedJQLQueriesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/jql/pdcleaner',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
