/** A custom field and its new value with a list of issue to update. */
export interface MultipleCustomFieldValuesUpdate {
  /** The ID or key of the custom field. For example, `customfield_10010`. */
  customField: string;
  /** The list of issue IDs. */
  issueIds: number[];
  /**
   * The value for the custom field. The value must be compatible with the [custom field
   * type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#data-types) as
   * follows:
   *
   * `string` the value must be a string. `number` the value must be a number. `datetime` the value must be a string
   * that represents a date in the ISO format or the simplified extended ISO format. For example,
   * `"2023-01-18T12:00:00-03:00"` or `"2023-01-18T12:00:00.000Z"`. However, the milliseconds part is ignored. `user`
   * the value must be an object that contains the `accountId` field. `group` the value must be an object that contains
   * the group `name` or `groupId` field. Because group names can change, we recommend using `groupId`.
   *
   * A list of appropriate values must be provided if the field is of the `list` [collection
   * type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#collection-types).
   */
  value: unknown;
}
