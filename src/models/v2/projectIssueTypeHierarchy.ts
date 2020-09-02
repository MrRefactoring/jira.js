import { ProjectIssueTypesHierarchyLevel } from "./projectIssueTypesHierarchyLevel";

export interface ProjectIssueTypeHierarchy {
    projectId: number;
    hierarchy: ProjectIssueTypesHierarchyLevel[];
}