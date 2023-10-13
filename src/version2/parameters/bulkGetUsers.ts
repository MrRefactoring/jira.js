export interface BulkGetUsers {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The account ID of a user. To specify multiple users, pass multiple `accountId` parameters. For example,
   * `accountId=5b10a2844c20165700ede21g&accountId=5b10ac8d82e05b22cc7d4ef5`.
   */
  accountId: string[];
}
