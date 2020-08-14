export interface Workflowscheme {
    id: number;
    name: string;
    description: string;
    defaultWorkflow: string;
    issueTypeMappings: any;
    originalDefaultWorkflow: string;
    originalIssueTypeMappings: any;
    draft: boolean;
    lastModifiedUser: any;
    lastModified: string;
    self: string;
    updateDraftIfNeeded: boolean;
    issueTypes: any;
}
