import { AddFieldBean } from '../models';

export interface AddScreenTabField extends AddFieldBean {
  /** The ID of the screen. */
  screenId: number;
  /** The ID of the screen tab. */
  tabId: number;
}
