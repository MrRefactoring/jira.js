export interface HierarchyLevel {
  /**
   * The ID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from
   * next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  id?: number;
  /** The name of this hierarchy level. */
  name?: string;
  /**
   * The ID of the level above this one in the hierarchy. This property is deprecated, see [Change notice: Removing
   * hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  aboveLevelId?: number;
  /**
   * The ID of the level below this one in the hierarchy. This property is deprecated, see [Change notice: Removing
   * hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  belowLevelId?: number;
  /**
   * The ID of the project configuration. This property is deprecated, see [Change oticen: Removing hierarchy level IDs
   * from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  projectConfigurationId?: number;
  /** The level of this item in the hierarchy. */
  level?: number;
  /** The issue types available in this hierarchy level. */
  issueTypeIds?: number[];
  /**
   * The external UUID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level
   * IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  externalUuid?: string;
  globalHierarchyLevel?: string;
}
