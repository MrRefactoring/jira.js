import { User } from './user';

export interface WorkflowScheme {
    id: number;
    name: string;
    description: string;
    defaultWorkflow: string;
    issueTypeMappings: {
        [key: string]: string;
    };
    originalDefaultWorkflow: string;
    originalIssueTypeMappings: {
        [key: string]: string;
    };
    draft: boolean;
    lastModifiedUser: User[];
    lastModified: string;
    self: string;
    updateDraftIfNeeded: boolean;
    issueTypes: {
        [key: string]: any;
    };
}
