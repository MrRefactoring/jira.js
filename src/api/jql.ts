import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import {
  JQLReferenceData,
  AutoCompleteSuggestions,
  ParsedJqlQueries,
  ConvertedJQLQueries,
} from '../schemas';
export class Jql {
  constructor(private readonly client: Sender) {}

  public async getFieldReferenceData(
    callback?: Callback<JQLReferenceData>,
  ): Promise<JQLReferenceData> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/jql/autocompletedata',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFieldAutoCompleteSuggestions(
    params?: {
      fieldName?: string;
      fieldValue?: string;
      predicateName?: string;
      predicateValue?: string;
    },
    callback?: Callback<AutoCompleteSuggestions>,
  ): Promise<AutoCompleteSuggestions> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/jql/autocompletedata/suggestions',
      method: 'GET',
      params: {
        fieldName: params.fieldName,
        fieldValue: params.fieldValue,
        predicateName: params.predicateName,
        predicateValue: params.predicateValue,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async parseJqlQuery(
    params: {
      queries: Array<string>;
    },
    callback?: Callback<ParsedJqlQueries>,
  ): Promise<ParsedJqlQueries> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/jql/parse',
      method: 'POST',
      data: {
        queries: params.queries,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async convertUserIdentifiersToAccountIdsInJqlQueries(
    params?: {
      queryStrings?: Array<string>;
    },
    callback?: Callback<ConvertedJQLQueries>,
  ): Promise<ConvertedJQLQueries> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/jql/pdcleaner',
      method: 'POST',
      data: {
        queryStrings: params.queryStrings,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
