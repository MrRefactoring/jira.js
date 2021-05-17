import { Scope } from './scope';

/**
 * A screen. */
export interface Screen {
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  /** The description of the screen. */
  description?: string;
  scope?: Scope;
}
