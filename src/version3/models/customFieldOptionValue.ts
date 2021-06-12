/** Value of a custom field option and the values of its cascading options. */
export interface CustomFieldOptionValue {
  /** The value of the custom field option. */
  value: string;
  /** The cascading options. */
  cascadingOptions?: string[];
}
