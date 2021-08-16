import { AddField } from '../models';

export interface AddScreenTabField extends AddField {
  /** The ID of the screen. */
  screenId: number;
  /** The ID of the screen tab. */
  tabId: number;
}
