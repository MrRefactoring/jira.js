export interface GetPrecomputations {
  /**
   * The function key in format:
   *
   * Forge: `ari:cloud:ecosystem::extension/[App ID]/[Environment ID]/static/[Function key from manifest]` Connect:
   * `[App key]__[Module key]`
   */
  functionKey?: string[];
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * @deprecated [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a
   *   field:
   *
   *   - `functionKey` Sorts by the functionKey.
   *   - `used` Sorts by the used timestamp.
   *   - `created` Sorts by the created timestamp.
   *   - `updated` Sorts by the updated timestamp.
   */
  filter?: string;
  orderBy?:
    | 'functionKey'
    | 'used'
    | 'created'
    | 'updated'
    | '+functionKey'
    | '+used'
    | '+created'
    | '+updated'
    | '-functionKey'
    | '-used'
    | '-created'
    | '-updated'
    | string;
}
