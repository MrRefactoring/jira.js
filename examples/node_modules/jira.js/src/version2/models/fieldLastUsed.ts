/** Information about the most recent use of a field. */
export interface FieldLastUsed {
  /**
   * Last used value type:
   *
   * _TRACKED_: field is tracked and a last used date is available. _NOT_TRACKED_: field is not tracked, last used date
   * is not available. _NO_INFORMATION_: field is tracked, but no last used date is available.
   */
  type?: string;
  /** The date when the value of the field last changed. */
  value?: string;
}
