export interface GetQueues {
  /** ID of the service desk whose queues will be returned. This can alternatively be a [project identifier.](#project-identifiers) */
  serviceDeskId: string;
  /** Specifies whether to include each queue's customer request (issue) count in the response. */
  includeCount?: boolean;
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
