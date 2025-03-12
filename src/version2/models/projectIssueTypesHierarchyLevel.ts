import type { IssueTypeInfo } from './issueTypeInfo';

/** Details of an issue type hierarchy level. */
export interface ProjectIssueTypesHierarchyLevel {
  /** The list of issue types in the hierarchy level. */
  issueTypes?: IssueTypeInfo[];
  /** The level of the issue type hierarchy level. */
  level?: number;
  /** The name of the issue type hierarchy level. */
  name?: string;
}
