/** @deprecated Use {@link StatusCategoryJson} instead. */
export type StatusCategoryJsonBean = StatusCategoryJson;

export interface StatusCategoryJson {
  /** The URL of the status category. */
  self?: string;
  /** The ID of the status category. */
  id?: number;
  /** The key of the status category. */
  key?: string;
  /** The name of the color used to represent the status category. */
  colorName?: string;
  /** The name of the status category. */
  name?: string;
}
