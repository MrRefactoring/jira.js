import { User } from './user';

export interface Component {
    self: string;
    id: string;
    name: string;
    description: string;
    lead: User[];
    leadUserName: string;
    leadAccountId: string;
    assigneeType: string;
    assignee: User[];
    realAssigneeType: string;
    realAssignee: User[];
    isAssigneeTypeValid: boolean;
    project: string;
    projectId: number;
}
