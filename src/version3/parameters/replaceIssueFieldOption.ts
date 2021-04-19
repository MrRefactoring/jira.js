export interface ReplaceIssueFieldOption {
  /** The ID of the option that will replace the currently selected option. */
  replaceWith?: number;
  /** A JQL query that specifies the issues to be updated. For example, *project=10000*. */
  jql?: string;
  /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:

   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.
   *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
  fieldKey: string;
  /** The ID of the option to be deselected. */
  optionId: number;
}
