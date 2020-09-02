import { User } from "./user";

export interface ComponentWithIssueCount {
    issueCount: number;
    description: string;
    project: string;
    assigneeType: string;
    lead: User[];
    self: string;
    projectId: number;
    realAssignee: User[];
    isAssigneeTypeValid: boolean;
    assignee: User[];
    realAssigneeType: string;
    name: string;
    id: string;
}