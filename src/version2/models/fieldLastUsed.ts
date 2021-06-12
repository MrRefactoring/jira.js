/** Information about the most recent use of a field. */
export interface FieldLastUsed {
  /**
   * Last used value type:
   *
   * *TRACKED*: field is tracked and a last used date is available. *NOT_TRACKED*: field is not tracked, last used date
   * is not available. *NO_INFORMATION*: field is tracked, but no last used date is available.
   */
  type?: string;
  /** The date when the value of the field last changed. */
  value?: string;
}
