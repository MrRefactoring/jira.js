export interface GetTrashedFieldsPaginated {
  expand?: string | string[];
  id?: string[];
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `name` sorts by the field name
   * - `trashDate` sorts by the date the field was moved to the trash
   * - `plannedDeletionDate` sorts by the planned deletion date
   */
  orderBy?:
  | 'name'
  | 'trashDate'
  | 'plannedDeletionDate'
  | '+name'
  | '+trashDate'
  | '+plannedDeletionDate'
  | '-name'
  | '-trashDate'
  | '-plannedDeletionDate'
  | string;
  /** String used to perform a case-insensitive partial match with field names or descriptions. */
  query?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
}
