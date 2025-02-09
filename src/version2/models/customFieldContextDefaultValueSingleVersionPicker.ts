/** The default value for a version picker custom field. */
export interface CustomFieldContextDefaultValueSingleVersionPicker {
  type: string;
  /** The ID of the default version. */
  versionId: string;
  /**
   * The order the pickable versions are displayed in. If not provided, the released-first order is used. Available
   * version orders are `"releasedFirst"` and `"unreleasedFirst"`.
   */
  versionOrder?: string;
}
