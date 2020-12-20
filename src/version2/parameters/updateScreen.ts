import { UpdateScreenDetails } from '../models';

export interface UpdateScreen extends UpdateScreenDetails {
  /** The ID of the screen. */
  screenId: number;
}
