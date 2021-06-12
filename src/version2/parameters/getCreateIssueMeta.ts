export interface GetCreateIssueMeta {
  /**
   * List of project IDs. This parameter accepts a comma-separated list. Multiple project IDs can also be provided using
   * an ampersand-separated list. For example, `projectIds=10000,10001&projectIds=10020,10021`. This parameter may be
   * provided with `projectKeys`.
   */
  projectIds?: string[];
  /**
   * List of project keys. This parameter accepts a comma-separated list. Multiple project keys can also be provided
   * using an ampersand-separated list. For example, `projectKeys=proj1,proj2&projectKeys=proj3`. This parameter may be
   * provided with `projectIds`.
   */
  projectKeys?: string[];
  /**
   * List of issue type IDs. This parameter accepts a comma-separated list. Multiple issue type IDs can also be provided
   * using an ampersand-separated list. For example, `issuetypeIds=10000,10001&issuetypeIds=10020,10021`. This parameter
   * may be provided with `issuetypeNames`.
   */
  issuetypeIds?: string[];
  /**
   * List of issue type names. This parameter accepts a comma-separated list. Multiple issue type names can also be
   * provided using an ampersand-separated list. For example, `issuetypeNames=name1,name2&issuetypeNames=name3`. This
   * parameter may be provided with `issuetypeIds`.
   */
  issuetypeNames?: string[];
  /**
   * Use [expand](#expansion) to include additional information about issue metadata in the response. This parameter
   * accepts `projects.issuetypes.fields`, which returns information about the fields in the issue creation screen for
   * each issue type. Fields hidden from the screen are not returned. Use the information to populate the `fields` and
   * `update` fields in [Create issue](#api-rest-api-2-issue-post) and [Create issues](#api-rest-api-2-issue-bulk-post).
   */
  expand?: string;
}
