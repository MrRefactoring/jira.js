import { ProjectForScope } from './projectForScope';

/**
 * The projects the item is associated with. Indicated for items associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO). */
export interface Scope {
  /** The type of scope. */
  type?: string;
  project?: ProjectForScope;
}
