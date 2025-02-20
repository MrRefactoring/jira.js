export interface GetPrioritySchemes {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * A set of priority IDs to filter by. To include multiple IDs, provide an ampersand-separated list. For example,
   * `priorityId=10000&priorityId=10001`.
   */
  priorityId?: number[];
  /**
   * A set of priority scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `schemeId=10000&schemeId=10001`.
   */
  schemeId?: number[];
  /** The name of scheme to search for. */
  schemeName?: string;
  /** Whether only the default priority is returned. */
  onlyDefault?: boolean;
  /** The ordering to return the priority schemes by. */
  orderBy?: 'name' | '+name' | '-name' | string;
  /**
   * A comma separated list of additional information to return. "priorities" will return priorities associated with the
   * priority scheme. "projects" will return projects associated with the priority scheme.
   * `expand=priorities,projects`.
   */
  expand?: string;
}
