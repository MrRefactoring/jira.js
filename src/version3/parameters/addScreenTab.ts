import type { ScreenableTab } from '../models/index.js';

export interface AddScreenTab extends ScreenableTab {
  /** The ID of the screen. */
  screenId: number;
}
