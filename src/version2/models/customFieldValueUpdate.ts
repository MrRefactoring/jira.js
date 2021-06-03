/** A list of issue IDs and the value to update a custom field to. */
export interface CustomFieldValueUpdate {
  /** The list of issue IDs. */
  issueIds: number[];
  /**
   * The value for the custom field. The value must be compatible with the [custom field
   * type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#data-types) as follows:
   *
   * `string` – the value must be a string. `number` – the value must be a number. `datetime` – the value must be a
   * string that represents a date in the ISO format, for example `"2021-01-18T12:00:00-03:00"`. `user` – the value must
   * be an object that contains the `accountId` field. `group` – the value must be an object that contains the group
   * `name` field.
   *
   *     A list of appropriate values must be provided if the field is of the `list` [collection type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#collection-types).
   */
  value: any;
}
