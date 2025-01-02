import type { Scope } from './scope.mjs';
import type { ScreenableTab } from './screenableTab.mjs';

/** A screen with tab details. */
export interface ScreenWithTab {
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  /** The description of the screen. */
  description?: string;
  scope?: Scope;
  tab?: ScreenableTab;
}
