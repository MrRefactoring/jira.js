import { UpdateScreenDetails } from '../models/index.mjs';

export interface UpdateScreen extends UpdateScreenDetails {
  /** The ID of the screen. */
  screenId: number;
}
