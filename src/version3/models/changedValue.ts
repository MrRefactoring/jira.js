/** Details of names changed in the record event. */
export interface ChangedValue {
  /** The name of the field changed. */
  fieldName?: string;
  /** The value of the field before the change. */
  changedFrom?: string;
  /** The value of the field after the change. */
  changedTo?: string;
}
