/** The default value for a date time custom field. */
export interface CustomFieldContextDefaultValueDateTime {
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
}
