export interface Hierarchylevel {
    id: number;
    name: string;
    aboveLevelId: number;
    belowLevelId: number;
    projectConfigurationId: number;
    issueTypeIds: any[];
    externalUuid: string;
}
