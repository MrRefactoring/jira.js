export interface GetAllDashboards {
  /**
   * The filter applied to the list of dashboards. Valid values are:
   *
   * `favourite` Returns dashboards the user has marked as favorite. `my` Returns dashboards owned by the user.
   */
  filter?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
