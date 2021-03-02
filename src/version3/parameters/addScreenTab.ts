import { ScreenableTab } from '../models';

export interface AddScreenTab extends ScreenableTab {
  /** The ID of the screen. */
  screenId: number;
}
