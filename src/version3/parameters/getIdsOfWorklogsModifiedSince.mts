export interface GetIdsOfWorklogsModifiedSince {
  /** The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned. */
  since?: number;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties` that returns the properties of each
   * worklog.
   */
  expand?: string;
}
