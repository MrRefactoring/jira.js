export interface GetUsersFromGroup {
  /** The name of the group. */
  groupname: string;
  /** Include inactive users. */
  includeInactiveUsers?: boolean;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
