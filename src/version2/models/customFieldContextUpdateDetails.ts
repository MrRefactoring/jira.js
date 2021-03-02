/**
 * Details of a custom field context. */
export interface CustomFieldContextUpdateDetails {
  /** The name of the custom field context. The name must be unique. The maximum length is 255 characters. */
  name?: string;
  /** The description of the custom field context. The maximum length is 255 characters. */
  description?: string;
}
