import { Scope } from './scope';

/** A context. */
export interface Context {
  /** The ID of the context. */
  id?: number;
  /** The name of the context. */
  name?: string;
  scope?: Scope;
}
