import type { Scope } from './scope';

/** A screen. */
export interface Screen {
  /** The description of the screen. */
  description?: string;
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  scope?: Scope;
}
