import type { Scope } from './scope';
import type { ScreenableTab } from './screenableTab';

/** A screen with tab details. */
export interface ScreenWithTab {
  /** The description of the screen. */
  description?: string;
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  scope?: Scope;
  tab?: ScreenableTab;
}
