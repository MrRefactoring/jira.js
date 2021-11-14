export interface GetEditIssueMeta {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /**
   * Whether hidden fields are returned. Available to Connect app users with admin permission and Forge app users with
   * the `manage:jira-configuration` scope.
   */
  overrideScreenSecurity?: boolean;
  /**
   * Whether non-editable fields are returned. Available to Connect app users with admin permission and Forge app users
   * with the `manage:jira-configuration` scope.
   */
  overrideEditableFlag?: boolean;
}
