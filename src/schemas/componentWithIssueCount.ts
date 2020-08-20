import { User } from './user';

export interface ComponentWithIssueCount {
    issueCount: number;
    realAssignee: User[];
    isAssigneeTypeValid: boolean;
    realAssigneeType: string;
    projectId: number;
    assignee: User[];
    lead: User[];
    assigneeType: string;
    project: string;
    description: string;
    self: string;
    name: string;
    id: string;
}
