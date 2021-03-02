/**
 * Details of an operation to perform on a field. */
export interface FieldUpdateOperation {
  /** A map containing the name of a field and the value to add to it. */
  add?: Record<string, any>;
  /** A map containing the name of a field and the value to set in it. */
  set?: Record<string, any>;
  /** A map containing the name of a field and the value to removed from it. */
  remove?: Record<string, any>;
  /** A map containing the name of a field and the value to edit in it. */
  edit?: Record<string, any>;
}
