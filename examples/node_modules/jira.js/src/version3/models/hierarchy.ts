import type { HierarchyLevel } from './hierarchyLevel';

/** The project issue type hierarchy. */
export interface Hierarchy {
  /** Details about the hierarchy level. */
  levels?: HierarchyLevel[];
}
