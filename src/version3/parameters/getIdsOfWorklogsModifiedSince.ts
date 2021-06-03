export interface GetIdsOfWorklogsModifiedSince {
  /** The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned. */
  since?: number;
  /**
   * Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts
   * `properties` that returns the properties of each worklog.
   */
  expand?: string;
}
