export interface HierarchyLevel {
  /** The name of this hierarchy level. */
  name?: string;
  /** The level of this item in the hierarchy. */
  level?: number;
  /** The issue types available in this hierarchy level. */
  issueTypeIds?: number[];
  globalHierarchyLevel?: string;
}
