export interface GetTrashedFieldsPaginated {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  id?: string[];
  /** String used to perform a case-insensitive partial match with field names or descriptions. */
  query?: string;
  expand?: string | string[];
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `name` sorts by the field name
   * - `trashDate` sorts by the date the field was moved to the trash
   * - `plannedDeletionDate` sorts by the planned deletion date
   */
  orderBy?:
    | 'name'
    | '-name'
    | '+name'
    | 'trashDate'
    | '-trashDate'
    | '+trashDate'
    | 'plannedDeletionDate'
    | '-plannedDeletionDate'
    | '+plannedDeletionDate'
    | 'projectsCount'
    | '-projectsCount'
    | '+projectsCount'
    | string;
}
