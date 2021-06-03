export interface BulkGetUsersMigration {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * Username of a user. To specify multiple users, pass multiple copies of this parameter. For example,
   * `username=fred&username=barney`. Required if `key` isn't provided. Cannot be provided if `key` is present.
   */
  username?: string[];
  /**
   * Key of a user. To specify multiple users, pass multiple copies of this parameter. For example,
   * `key=fred&key=barney`. Required if `username` isn't provided. Cannot be provided if `username` is present.
   */
  key?: string[];
}
