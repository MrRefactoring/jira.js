import { z } from 'zod';
import { IssueTypeInfoSchema } from './issueTypeInfo';

/** Details of an issue type hierarchy level. */
export const ProjectIssueTypesHierarchyLevelSchema = z.object({
  /**
   * The ID of the issue type hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level
   * IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  entityId: z.string().optional(),
  /** The list of issue types in the hierarchy level. */
  issueTypes: z.array(IssueTypeInfoSchema).optional(),
  /** The level of the issue type hierarchy level. */
  level: z.number().int().optional(),
  /** The name of the issue type hierarchy level. */
  name: z.string().optional(),
});

export type ProjectIssueTypesHierarchyLevel = z.infer<typeof ProjectIssueTypesHierarchyLevelSchema>;
