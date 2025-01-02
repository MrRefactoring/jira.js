export interface GetUsersInOrganization {
  /** The ID of the organization. */
  organizationId: number;
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
