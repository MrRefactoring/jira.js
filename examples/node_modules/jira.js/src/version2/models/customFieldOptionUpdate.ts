/** Details of a custom field option for a context. */
export interface CustomFieldOptionUpdate {
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** The ID of the custom field option. */
  id: string;
  /** The value of the custom field option. */
  value?: string;
}
