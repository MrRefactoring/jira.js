/**
 * The IDs of the screens for the screen types of the screen scheme. */
export interface UpdateScreenTypes {
  /** The ID of the edit screen. To remove the screen association, pass a null. */
  edit?: string;
  /** The ID of the create screen. To remove the screen association, pass a null. */
  create?: string;
  /** The ID of the view screen. To remove the screen association, pass a null. */
  view?: string;
  /** The ID of the default screen. When specified, must include a screen ID as a default screen is required. */
  default?: string;
}
