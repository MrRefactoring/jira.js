export interface HierarchyLevel {
  id?: number;
  name?: string;
  aboveLevelId?: number;
  belowLevelId?: number;
  projectConfigurationId?: number;
  level?: number;
  issueTypeIds?: number[];
  externalUuid?: string;
  globalHierarchyLevel?: string;
}
