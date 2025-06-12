import type { OneOrMany } from '../../interfaces';

export interface GetFieldsPaginated {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The type of fields to search. */
  type?: ('custom' | 'system' | string)[];
  /** The IDs of the custom fields to return or, where `query` is specified, filter. */
  id?: string[];
  /** String used to perform a case-insensitive partial match with field names or descriptions. */
  query?: string;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `contextsCount` sorts by the number of contexts related to a field
   * - `lastUsed` sorts by the date when the value of the field last changed
   * - `name` sorts by the field name
   * - `screensCount` sorts by the number of screens related to a field
   */
  orderBy?:
    | 'contextsCount'
    | '-contextsCount'
    | '+contextsCount'
    | 'lastUsed'
    | '-lastUsed'
    | '+lastUsed'
    | 'name'
    | '-name'
    | '+name'
    | 'screensCount'
    | '-screensCount'
    | '+screensCount'
    | 'projectsCount'
    | '-projectsCount'
    | '+projectsCount'
    | string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `key` returns the key for each field
   * - `lastUsed` returns the date when the value of the field last changed
   * - `screensCount` returns the number of screens related to a field `contextsCount` returns the number of contexts
   *   related to a field
   * - `isLocked` returns information about whether the field is [locked](https://confluence.atlassian.com/x/ZSN7Og)
   * - `searcherKey` returns the searcher key for each custom field
   */
  expand?: OneOrMany<'key' | 'lastUsed' | 'screensCount' | 'isLocked' | 'searcherKey' | string>;
  projectIds?: number[];
}
