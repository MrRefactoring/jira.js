/** Details of an operation to perform on a field. */
export interface FieldUpdateOperation {
  /** The value to add to the field. */
  add?: any;
  /** The value to set in the field. */
  set?: any;
  /** The value to removed from the field. */
  remove?: any;
  /** The value to edit in the field. */
  edit?: any;
}
