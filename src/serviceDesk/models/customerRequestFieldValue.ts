export interface CustomerRequestFieldValue {
  /** ID of the field. */
  fieldId?: string;
  /** Text label for the field. */
  label?: string;
  /** Value of the field. */
  value?: unknown;
  /** Value of the field rendered in the UI. */
  renderedValue?: unknown;
}
