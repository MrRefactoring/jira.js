import { User } from './user';

export interface ComponentWithIssueCount {
  issueCount: number;
  self: string;
  realAssignee: User[];
  isAssigneeTypeValid: boolean;
  realAssigneeType: string;
  description: string;
  project: string;
  projectId: number;
  assignee: User[];
  lead: User[];
  assigneeType: string;
  name: string;
  id: string;
}
