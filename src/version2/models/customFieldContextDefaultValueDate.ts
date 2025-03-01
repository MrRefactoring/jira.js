/** The default value for a Date custom field. */
export interface CustomFieldContextDefaultValueDate {
  /** The default date in ISO format. Ignored if `useCurrent` is true. */
  date?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
}
