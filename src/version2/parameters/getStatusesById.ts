export interface GetStatusesById {
  /**
   * The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.
   *
   *     Min items `1`, Max items `50`
   */
  id?: string[];
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * `usages` Returns the project and issue types that use the status in their workflow.
   */
  expand?: 'usages' | 'usages'[] | string | string[];
}
