export interface GetSlaInformation {
  /** The ID or key of the customer request whose SLAs will be retrieved. */
  issueIdOrKey: string;
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more
   * details.
   */
  start?: number;
  /**
   * The maximum number of request types to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more
   * details.
   */
  limit?: number;
}
