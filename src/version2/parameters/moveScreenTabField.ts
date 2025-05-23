import type { MoveField } from '../models';

export interface MoveScreenTabField extends MoveField {
  /** The ID of the screen. */
  screenId: number;
  /** The ID of the screen tab. */
  tabId: number;
  /** The ID of the field. */
  id: string;
}
