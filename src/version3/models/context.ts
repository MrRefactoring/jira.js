import { Scope } from './scope';

/**
 * A context. */
export interface Context {
  /** The ID of the context. */
  id?: number;
  /** The name of the context. */
  name?: string;
  /** The scope of the context. */
  scope?: Scope[];
}
