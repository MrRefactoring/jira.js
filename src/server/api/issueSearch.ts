import { SearchResultsSchema, type SearchResults } from '../models/searchResults';
import type { Search } from '../parameters/search';
import type { SearchUsingSearchRequest } from '../parameters/searchUsingSearchRequest';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Searches for issues using JQL. Sorting the jql parameter is a full
 * [JQL](http://confluence.atlassian.com/display/JIRA/Advanced+Searching) expression, and includes an ORDER BY clause.
 * The fields param (which can be specified multiple times) gives a comma-separated list of fields to include in the
 * response. This can be used to retrieve a subset of fields. A particular field can be excluded by prefixing it with a
 * minus. By default, only navigable (*navigable) fields are returned in this search resource. Note: the default is
 * different in the get-issue resource -- the default there all fields (*all). *all - include all fields *navigable -
 * include just navigable fields summary,comment - include just the summary and comments -description - include
 * navigable fields except the description (the default is *navigable for search) *all,-comment - include everything
 * except comments GET vs POST: If the JQL query is too large to be encoded as a query param you should instead POST to
 * this resource. Expanding Issues in the Search Result: It is possible to expand the issues returned by directly
 * specifying the expansion on the expand parameter passed in to this resources. For instance, to expand the changelog
 * for all the issues on the search result, it is necessary to specify changelog as one of the values to expand.
 */
export async function search(client: Client, parameters?: Search, options?: RequestOptions): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: '/rest/api/2/search',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
      jql: parameters?.jql,
      maxResults: parameters?.maxResults,
      validateQuery: parameters?.validateQuery,
      fields: parameters?.fields,
      startAt: parameters?.startAt,
    },
    schema: SearchResultsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Performs a search using JQL. */
export async function searchUsingSearchRequest(
  client: Client,
  parameters: SearchUsingSearchRequest,
  options?: RequestOptions,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: '/rest/api/2/search',
    method: 'POST',
    body: {
      expand: parameters.expand,
      fields: parameters.fields,
      jql: parameters.jql,
      maxResults: parameters.maxResults,
      startAt: parameters.startAt,
      validateQuery: parameters.validateQuery,
    },
    schema: SearchResultsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Available since Jira Data Center 11.3. */
export async function getError(client: Client, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/search/error/lookup',
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
