export interface GetIssueSecurityLevelMembers {
  /**
   * The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-2-issuesecurityschemes-get)
   * operation to get a list of issue security scheme IDs.
   */
  issueSecuritySchemeId: number;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of issue security level IDs. To include multiple issue security levels separate IDs with ampersand:
   * `issueSecurityLevelId=10000&issueSecurityLevelId=10001`.
   */
  issueSecurityLevelId?: number[];
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand
   * options include:
   *
   * `all` Returns all expandable information. `field` Returns information about the custom field granted the
   * permission. `group` Returns information about the group that is granted the permission. `projectRole` Returns
   * information about the project role granted the permission. `user` Returns information about the user who is granted
   * the permission.
   */
  expand?: string;
}
