export interface HierarchyLevel {
    id: number;
    name: string;
    aboveLevelId: number;
    belowLevelId: number;
    projectConfigurationId: number;
    issueTypeIds: number[];
    externalUuid: string;
}
