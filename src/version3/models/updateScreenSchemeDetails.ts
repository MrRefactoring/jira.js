import { UpdateScreenTypes } from './updateScreenTypes';

/**
 * Details of a screen scheme. */
export interface UpdateScreenSchemeDetails {
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name?: string;
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description?: string;
  screens?: UpdateScreenTypes;
}
