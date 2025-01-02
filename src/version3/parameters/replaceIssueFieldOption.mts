export interface ReplaceIssueFieldOption {
  /** The ID of the option that will replace the currently selected option. */
  replaceWith?: number;
  /** A Jql query that specifies the issues to be updated. For example, _project=10000_. */
  jql?: string;
  /**
   * Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app
   * users with admin permission.
   */
  overrideScreenSecurity?: boolean;
  /**
   * Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app
   * users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideEditableFlag?: boolean;
  /**
   * The field key is specified in the following format: **$(app-key)__$(field-key)**. For example,
   * _example-add-on__example-issue-field_. To determine the `fieldKey` value, do one of the following:
   *
   * Open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the
   * `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin
   * Manager. run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For
   * example, `"key": "teams-add-on__team-issue-field"`
   */
  fieldKey: string;
  /** The ID of the option to be deselected. */
  optionId: number;
}
