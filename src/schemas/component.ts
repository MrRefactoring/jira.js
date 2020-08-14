export interface Component {
    self: string;
    id: string;
    name: string;
    description: string;
    lead: any;
    leadUserName: string;
    leadAccountId: string;
    assigneeType: string;
    assignee: any;
    realAssigneeType: string;
    realAssignee: any;
    isAssigneeTypeValid: boolean;
    project: string;
    projectId: number;
}
