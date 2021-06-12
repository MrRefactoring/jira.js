export interface GetAllIssueFieldOptions {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The field key is specified in the following format: **$(app-key)__$(field-key)**. For example,
   * *example-add-on__example-issue-field*. To determine the `fieldKey` value, do one of the following:
   *
   * Open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the
   * `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin
   * Manager. run [Get fields](#api-rest-api-2-field-get) and in the field details the value is returned in `key`. For
   * example, `"key": "teams-add-on__team-issue-field"`
   */
  fieldKey: string;
}
