import { AutoCompleteResponseSchema, type AutoCompleteResponse } from '../models/autoCompleteResponse';
import { AutoCompleteResultWrapperSchema, type AutoCompleteResultWrapper } from '../models/autoCompleteResultWrapper';
import type { GetFieldAutoCompleteForQueryString } from '../parameters/getFieldAutoCompleteForQueryString';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns the auto complete data required for JQL searches */
export async function getAutoComplete(client: Client, options?: RequestOptions): Promise<AutoCompleteResponse> {
  const config: SendRequestOptions<AutoCompleteResponse> = {
    url: '/rest/api/2/jql/autocompletedata',
    method: 'GET',
    schema: AutoCompleteResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns auto complete suggestions for JQL search */
export async function getFieldAutoCompleteForQueryString(
  client: Client,
  parameters?: GetFieldAutoCompleteForQueryString,
  options?: RequestOptions,
): Promise<AutoCompleteResultWrapper> {
  const config: SendRequestOptions<AutoCompleteResultWrapper> = {
    url: '/rest/api/2/jql/autocompletedata/suggestions',
    method: 'GET',
    searchParams: {
      predicateValue: parameters?.predicateValue,
      predicateName: parameters?.predicateName,
      fieldName: parameters?.fieldName,
      fieldValue: parameters?.fieldValue,
    },
    schema: AutoCompleteResultWrapperSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
