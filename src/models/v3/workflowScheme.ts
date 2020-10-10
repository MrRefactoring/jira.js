import { User } from './user';

export interface WorkflowScheme {
  id: number;
  name: string;
  description: string;
  defaultWorkflow: string;
  issueTypeMappings: {
    [key: string]: unknown;
  };
  originalDefaultWorkflow: string;
  originalIssueTypeMappings: {
    [key: string]: unknown;
  };
  draft: boolean;
  lastModifiedUser: User[];
  lastModified: string;
  self: string;
  updateDraftIfNeeded: boolean;
  issueTypes: {
    [key: string]: unknown;
  };
}
