import { User } from "./user";

export interface ComponentWithIssueCount {
    issueCount: number;
    realAssignee: User[];
    isAssigneeTypeValid: boolean;
    assignee: User[];
    realAssigneeType: string;
    projectId: number;
    description: string;
    project: string;
    assigneeType: string;
    lead: User[];
    self: string;
    name: string;
    id: string;
}