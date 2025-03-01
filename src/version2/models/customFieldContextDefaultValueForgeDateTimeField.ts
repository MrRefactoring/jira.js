/** The default value for a Forge date time custom field. */
export interface CustomFieldContextDefaultValueForgeDateTimeField {
  /** The ID of the context. */
  contextId: string;
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
}
