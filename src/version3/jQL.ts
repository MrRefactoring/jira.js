import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class JQL {
  constructor(private client: Client) { }
  async getAutoComplete<T = Models.JQLReferenceData>(callback?: Callback<T>): Promise<void>;
  async getAutoComplete<T = Models.JQLReferenceData>(callback?: undefined): Promise<T>;
  async getAutoComplete<T = Models.JQLReferenceData>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/jql/autocompletedata',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters?: Parameters.GetFieldAutoCompleteForQueryString, callback?: Callback<T>): Promise<void>;
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters?: Parameters.GetFieldAutoCompleteForQueryString, callback?: undefined): Promise<T>;
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters?: Parameters.GetFieldAutoCompleteForQueryString, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/jql/autocompletedata/suggestions',
      method: 'GET',
      params: {
        fieldName: parameters?.fieldName,
        fieldValue: parameters?.fieldValue,
        predicateName: parameters?.predicateName,
        predicateValue: parameters?.predicateValue,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters?: Parameters.ParseJqlQueries, callback?: Callback<T>): Promise<void>;
  async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters?: Parameters.ParseJqlQueries, callback?: undefined): Promise<T>;
  async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters?: Parameters.ParseJqlQueries, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/jql/parse',
      method: 'POST',
      params: {
        validation: parameters?.validation,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async migrateQueries<T = Models.ConvertedJQLQueries>(callback?: Callback<T>): Promise<void>;
  async migrateQueries<T = Models.ConvertedJQLQueries>(callback?: undefined): Promise<T>;
  async migrateQueries<T = Models.ConvertedJQLQueries>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/jql/pdcleaner',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
