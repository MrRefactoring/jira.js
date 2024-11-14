import type { ProjectIssueTypesHierarchyLevel } from './projectIssueTypesHierarchyLevel.js';

/** The hierarchy of issue types within a project. */
export interface ProjectIssueTypeHierarchy {
  /** Details of an issue type hierarchy level. */
  hierarchy?: ProjectIssueTypesHierarchyLevel[];
  /** The ID of the project. */
  projectId?: number;
}
