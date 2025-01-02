import type { ProjectIssueTypesHierarchyLevel } from './projectIssueTypesHierarchyLevel.mjs';

/** The hierarchy of issue types within a project. */
export interface ProjectIssueTypeHierarchy {
  /** The ID of the project. */
  projectId?: number;
  /** Details of an issue type hierarchy level. */
  hierarchy?: ProjectIssueTypesHierarchyLevel[];
}
