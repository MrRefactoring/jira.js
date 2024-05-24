import type { UpdateScreenDetails } from '../models/index.js';

export interface UpdateScreen extends UpdateScreenDetails {
  /** The ID of the screen. */
  screenId: number;
}
