import type { ProjectDetails } from './projectDetails';

/**
 * The projects the item is associated with. Indicated for items associated with [next-gen
 * projects](https://confluence.atlassian.com/x/loMyO).
 */
export interface Scope {
  project?: ProjectDetails;
  /** The type of scope. */
  type?: string;
}
