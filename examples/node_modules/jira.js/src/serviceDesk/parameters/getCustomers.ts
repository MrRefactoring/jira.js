export interface GetCustomers {
  /**
   * The ID of the service desk the customer list should be returned from. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  /** The string used to filter the customer list. */
  query?: string;
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more
   * details.
   */
  start?: number;
  /**
   * The maximum number of users to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more
   * details.
   */
  limit?: number;
}
