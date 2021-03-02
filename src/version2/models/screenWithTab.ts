import { Scope } from './scope';
import { ScreenableTab } from './screenableTab';

/**
 * A screen with tab details. */
export interface ScreenWithTab {
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  /** The description of the screen. */
  description?: string;
  /** The scope of the screen. */
  scope?: Scope[];
  /** The tab for the screen */
  tab?: ScreenableTab[];
}
