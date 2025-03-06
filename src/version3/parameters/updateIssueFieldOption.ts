import type { IssueFieldOption } from '../models';

export interface UpdateIssueFieldOption extends IssueFieldOption {
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
  /** The ID of the option to be updated. */
  optionId: number;
}
