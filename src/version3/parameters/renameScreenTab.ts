import { ScreenableTab } from '../models';

export interface RenameScreenTab extends ScreenableTab {
  /** The ID of the screen. */
  screenId: number;
  /** The ID of the screen tab. */
  tabId: number;
}
