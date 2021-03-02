/**
 * Details of an operation to perform on a field. */
export interface FieldUpdateOperation {
  /** A map containing the name of a field and the value to add to it. */
  add?: any;
  /** A map containing the name of a field and the value to set in it. */
  set?: any;
  /** A map containing the name of a field and the value to removed from it. */
  remove?: any;
  /** A map containing the name of a field and the value to edit in it. */
  edit?: any;
}
