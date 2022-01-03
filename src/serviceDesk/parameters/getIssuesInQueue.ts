export interface GetIssuesInQueue {
  /**
   * The ID of the service desk containing the queue to be queried. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  /** The ID of the queue whose customer requests will be returned. */
  queueId: number;
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more details.
   */
  start?: number;
  /**
   * The maximum number of items to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more details.
   */
  limit?: number;
}
