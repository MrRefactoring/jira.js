import { IssueTypeInfo } from './issueTypeInfo';

export interface ProjectIssueTypesHierarchyLevel {
    entityId: string;
    level: number;
    name: string;
    issueTypes: IssueTypeInfo[];
}
