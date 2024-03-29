export interface GetEditIssueMeta {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /**
   * Whether hidden fields are returned. Available to Connect app users with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideScreenSecurity?: boolean;
  /**
   * Whether non-editable fields are returned. Available to Connect app users with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideEditableFlag?: boolean;
}
