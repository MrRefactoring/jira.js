export interface GetProjectVersions {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string | number;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information in the response. This parameter accepts `operations`, which returns actions that can be performed on
   * the version.
   */
  expand?: string;
}
