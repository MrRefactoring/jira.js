/** The default value for a multiple version picker custom field. */
export interface CustomFieldContextDefaultValueMultipleVersionPicker {
  type: string;
  /** The IDs of the default versions. */
  versionIds: string[];
  /**
   * The order the pickable versions are displayed in. If not provided, the released-first order is used. Available
   * version orders are `"releasedFirst"` and `"unreleasedFirst"`.
   */
  versionOrder?: string;
}
