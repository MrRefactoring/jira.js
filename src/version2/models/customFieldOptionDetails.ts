/**
 * Details of a custom field option and its cascading options. */
export interface CustomFieldOptionDetails {
  /** The ID of the custom field option. */
  id?: number;
  /** The value of the custom field option. */
  value?: string;
  /** The cascading options. */
  cascadingOptions?: string[];
}
