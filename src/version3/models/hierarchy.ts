import { HierarchyLevel } from './hierarchyLevel';

/**
 * The project issue type hierarchy. */
export interface Hierarchy {
  /** The ID of the base level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  baseLevelId?: number;
  /** Details about the hierarchy level. */
  levels?: HierarchyLevel[];
}
