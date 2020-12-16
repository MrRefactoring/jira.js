/**
 * Details of a screen. */
export interface UpdateScreenDetails {
  /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
  name?: string;
  /** The description of the screen. The maximum length is 255 characters. */
  description?: string;
}
