import { MoveFieldBean } from '../models';

export interface MoveScreenTabField extends MoveFieldBean {
  /** The ID of the screen. */
  screenId: number;
  /** The ID of the screen tab. */
  tabId: number;
  /** The ID of the field. */
  id: string;
}
