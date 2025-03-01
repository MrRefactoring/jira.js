/** Details of an operation to perform on a field. */
export interface FieldUpdateOperation {
  /** The value to add to the field. */
  add?: {};
  /** The field value to copy from another issue. */
  copy?: {};
  /** The value to edit in the field. */
  edit?: {};
  /** The value to removed from the field. */
  remove?: {};
  /** The value to set in the field. */
  set?: {};
}
