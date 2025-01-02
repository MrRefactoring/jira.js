export interface GetIssueWorklog {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The worklog start date and time, as a UNIX timestamp in milliseconds, after which worklogs are returned. */
  startedAfter?: number;
  /** The worklog start date and time, as a UNIX timestamp in milliseconds, before which worklogs are returned. */
  startedBefore?: number;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about worklogs in the response. This parameter accepts`properties`, which returns worklog properties.
   */
  expand?: string;
}
