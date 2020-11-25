/**Details of an issue type hierarchy level.*/
export interface ProjectIssueTypesHierarchyLevel {
    /**The ID of the issue type hierarchy level.*/
    entityId?: string;
    /**The level of the issue type hierarchy level.*/
    level?: number;
    /**The name of the issue type hierarchy level.*/
    name?: string;
    /**The list of issue types in the hierarchy level.*/
    issueTypes?: IssueTypeInfo[];
}