import { IssueTypeInfo } from './issueTypeInfo';

/**
 * Details of an issue type hierarchy level. */
export interface ProjectIssueTypesHierarchyLevel {
  /**
   * @deprecated
   * The ID of the issue type hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  entityId?: string;
  /** The level of the issue type hierarchy level. */
  level?: number;
  /** The name of the issue type hierarchy level. */
  name?: string;
  /** The list of issue types in the hierarchy level. */
  issueTypes?: IssueTypeInfo[];
}
