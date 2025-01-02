import { ScreenableTab } from '../models/index.mjs';

export interface AddScreenTab extends ScreenableTab {
  /** The ID of the screen. */
  screenId: number;
}
