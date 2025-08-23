import { z } from 'zod';

export const SimplifiedHierarchyLevelSchema = z.object({
  /**
   * The ID of the level above this one in the hierarchy. This property is deprecated, see [Change notice: Removing
   * hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  aboveLevelId: z.number().int().optional(),
  /**
   * The ID of the level below this one in the hierarchy. This property is deprecated, see [Change notice: Removing
   * hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  belowLevelId: z.number().int().optional(),
  /**
   * The external UUID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level
   * IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  externalUuid: z.string().optional(),
  hierarchyLevelNumber: z.number().int().optional(),
  /**
   * The ID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from
   * next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  id: z.number().int().optional(),
  /** The issue types available in this hierarchy level. */
  issueTypeIds: z.array(z.number().int()).optional(),
  /** The level of this item in the hierarchy. */
  level: z.number().int().optional(),
  /** The name of this hierarchy level. */
  name: z.string().optional(),
  /**
   * The ID of the project configuration. This property is deprecated, see [Change oticen: Removing hierarchy level IDs
   * from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  projectConfigurationId: z.number().int().optional(),
});

export type SimplifiedHierarchyLevel = z.infer<typeof SimplifiedHierarchyLevelSchema>;
